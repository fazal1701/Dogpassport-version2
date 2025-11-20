from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
from ..models.record import Record
from ..services.record_service import create_record, get_dog_records
from ..services.dog_service import get_dog

router = APIRouter(tags=["records"])


@router.post("/upload-record")
async def upload_record(
    dog_id: str = Form(...),
    category: str = Form(...),
    file: UploadFile = File(...)
):
    """
    Upload a record for a dog.
    
    Note: File is not actually saved to disk - this is a fake upload.
    """
    # Validate dog exists
    dog = get_dog(dog_id)
    if not dog:
        raise HTTPException(status_code=404, detail=f"Dog with id '{dog_id}' not found")
    
    # Create record (fake upload - we don't save the file)
    record = create_record(
        dog_id=dog_id,
        filename=file.filename or "unknown",
        category=category
    )
    
    if not record:
        raise HTTPException(status_code=500, detail="Failed to create record")
    
    return {
        "success": True,
        "record": {
            "id": record.id,
            "dog_id": record.dog_id,
            "filename": record.filename,
            "category": record.category,
            "status": record.status
        }
    }


@router.get("/dogs/{dog_id}/records")
async def list_dog_records(dog_id: str):
    """Get all records for a specific dog."""
    dog = get_dog(dog_id)
    if not dog:
        raise HTTPException(status_code=404, detail=f"Dog with id '{dog_id}' not found")
    
    records = get_dog_records(dog_id)
    
    return {
        "dog": {
            "id": dog.id,
            "name": dog.name,
            "breed": dog.breed,
            "service_type": dog.service_type,
            "verified": dog.verified
        },
        "records": [
            {
                "id": r.id,
                "filename": r.filename,
                "category": r.category,
                "status": r.status,
                "expires_at": r.expires_at.isoformat() if r.expires_at else None,
                "analysis_status": r.analysis_status,
                "risk_score": r.risk_score,
                "issues": r.issues
            }
            for r in records
        ]
    }

