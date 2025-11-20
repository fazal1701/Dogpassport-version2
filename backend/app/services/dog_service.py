from typing import Optional
from ..models.dog import Dog
from ..core.database import FAKE_DB


def get_dog(dog_id: str) -> Optional[Dog]:
    """Get a dog by ID from the fake database."""
    return FAKE_DB["dogs"].get(dog_id)


def update_dog_verification(dog_id: str) -> Optional[Dog]:
    """Update a dog's verification status based on their records."""
    dog = get_dog(dog_id)
    if not dog:
        return None
    
    # Verification rule: dog is verified if it has:
    # - at least one "vaccination" record with analysis_status == "accepted"
    # - AND at least one "training" or "vet_visit" record with analysis_status == "accepted"
    
    has_vaccination = any(
        r.category == "vaccination" and r.analysis_status == "accepted"
        for r in dog.records
    )
    
    has_training_or_vet = any(
        r.category in ["training", "vet_visit"] and r.analysis_status == "accepted"
        for r in dog.records
    )
    
    dog.verified = has_vaccination and has_training_or_vet
    
    # Update in database
    FAKE_DB["dogs"][dog_id] = dog
    
    return dog

