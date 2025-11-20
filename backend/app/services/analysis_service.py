from typing import Dict, Any
from ..services.record_service import update_record, get_record
from ..services.dog_service import update_dog_verification


def analyze_record(dog_id: str, record_id: str) -> Dict[str, Any]:
    """
    Fake AI verification engine.
    
    Rules:
    - If filename contains "fake" or "invalid" (case-insensitive): DENIED
    - Otherwise: ACCEPTED
    """
    record = get_record(dog_id, record_id)
    if not record:
        return {
            "error": "Record not found"
        }
    
    # Fake AI logic
    filename_lower = record.filename.lower()
    
    if "fake" in filename_lower or "invalid" in filename_lower:
        # Denied
        analysis_status = "denied"
        risk_score = 0.85
        issues = [
            "Document appears tampered",
            "Missing or inconsistent metadata"
        ]
    else:
        # Accepted
        analysis_status = "accepted"
        risk_score = 0.15
        issues = []
    
    # Update record
    updated_record = update_record(
        dog_id=dog_id,
        record_id=record_id,
        status="analyzed",
        analysis_status=analysis_status,
        risk_score=risk_score,
        issues=issues
    )
    
    if not updated_record:
        return {
            "error": "Failed to update record"
        }
    
    # Recompute dog verification status
    dog = update_dog_verification(dog_id)
    
    if not dog:
        return {
            "error": "Dog not found"
        }
    
    return {
        "record": {
            "id": updated_record.id,
            "filename": updated_record.filename,
            "category": updated_record.category,
            "status": updated_record.status,
            "analysis_status": updated_record.analysis_status,
            "risk_score": updated_record.risk_score,
            "issues": updated_record.issues
        },
        "verification": {
            "verified": dog.verified,
            "rule": "vaccination + training/vet_visit"
        },
        "analysis": {
            "status": analysis_status,
            "risk_score": risk_score,
            "issues": issues
        }
    }

