"""
Business Portal API Routes

For businesses (airlines, hotels, restaurants, rideshares) to verify dogs.
CRITICAL: Only returns ADA-safe public information.
"""
from fastapi import APIRouter, HTTPException, Header
from typing import Optional
from ..models.verification import PublicStatusSummary
from ..services.business_verification_service import BusinessVerificationService
from ..services.dog_service import get_dog
from ..services.handler_service import get_handler
from ..services.record_service import get_dog_records
from ..services.audit_service import log_audit_event
from ..models.audit import EventType

router = APIRouter(prefix="/business", tags=["business"])


@router.get("/verify/{dog_id}", response_model=PublicStatusSummary)
async def verify_dog(
    dog_id: str,
    organization_id: Optional[str] = Header(None, alias="X-Organization-ID")
):
    """
    Verify a dog's service dog status (for businesses).
    
    Returns ONLY ADA-safe information:
    - Dog name, photo
    - Handler name
    - Verification level (Yellow/Green/Blue)
    - Service role and tasks
    - Vaccination status
    - Training/vet verification flags
    - Behavior status
    
    Does NOT return:
    - Internal fraud scores
    - Breed warnings
    - Mismatch flags
    - Internal review status
    """
    # Get dog
    dog = get_dog(dog_id)
    if not dog:
        raise HTTPException(status_code=404, detail="Dog not found")
    
    # Get handler
    handler = get_handler(dog.handler_id)
    if not handler:
        raise HTTPException(status_code=404, detail="Handler not found")
    
    # Get records
    records = get_dog_records(dog_id)
    
    # Get public status (ADA-safe)
    public_status = BusinessVerificationService.get_public_status(
        dog, handler, records
    )
    
    # Log audit event
    log_audit_event(
        event_type=EventType.QR_CODE_SCANNED,
        actor_id=organization_id or "unknown",
        actor_type="business",
        dog_id=dog_id,
        metadata={"verification_level": public_status.verification_level.value}
    )
    
    return public_status


@router.post("/verify-scan")
async def verify_scan(
    qr_code: str,
    organization_id: Optional[str] = Header(None, alias="X-Organization-ID")
):
    """
    Verify via QR code scan.
    QR code contains dog_id or token that maps to dog_id.
    """
    # In production, decode QR code to get dog_id
    # For now, assume QR code is dog_id
    dog_id = qr_code.replace("/qr/", "").replace("qr_", "")
    
    return await verify_dog(dog_id, organization_id)


@router.get("/verify-nfc/{nfc_token}")
async def verify_nfc(
    nfc_token: str,
    organization_id: Optional[str] = Header(None, alias="X-Organization-ID")
):
    """
    Verify via NFC tap.
    NFC token maps to dog_id.
    """
    # In production, look up NFC token to get dog_id
    dog_id = nfc_token.replace("nfc_", "")
    
    return await verify_dog(dog_id, organization_id)

