from fastapi import APIRouter, HTTPException
from ..services.dog_service import get_dog, update_dog_verification

router = APIRouter(tags=["dogs"])


@router.get("/dog-status/{dog_id}")
async def get_dog_status(dog_id: str):
    """Get a dog's current verification status."""
    dog = get_dog(dog_id)
    if not dog:
        raise HTTPException(status_code=404, detail=f"Dog with id '{dog_id}' not found")
    
    # Ensure verification status is up to date
    dog = update_dog_verification(dog_id)
    
    return {
        "dog": {
            "id": dog.id,
            "name": dog.name,
            "breed": dog.breed,
            "service_type": dog.service_type
        },
        "verified": dog.verified,
        "records_count": len(dog.records)
    }

