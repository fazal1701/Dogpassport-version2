"""
Enhanced Dog model with verification levels and service roles.
Separates public-facing data from internal data.
"""
from typing import List, Optional
from datetime import datetime, date
from pydantic import BaseModel, Field
from .verification import VerificationLevel, ServiceRole, PublicStatusSummary, InternalVerificationScores


class Dog(BaseModel):
    """Core dog profile."""
    id: str
    handler_id: str
    
    # Identity
    name: str
    breed: str
    weight: Optional[float] = None  # lbs
    age: Optional[int] = None
    date_of_birth: Optional[date] = None
    color: Optional[str] = None
    sex: Optional[str] = None
    photo_url: Optional[str] = None
    microchip: Optional[str] = None
    
    # Service role
    service_role: ServiceRole
    
    # Verification (public-facing)
    verification_level: VerificationLevel = VerificationLevel.YELLOW
    
    # Health metadata
    hypoallergenic_rating: Optional[str] = None  # "high" | "moderate" | "standard"
    
    # Timestamps
    created_at: datetime
    updated_at: datetime
    
    # Internal (not exposed in public APIs)
    _internal_scores: Optional[InternalVerificationScores] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "buddy",
                "handler_id": "user-1",
                "name": "Buddy",
                "breed": "Golden Retriever",
                "weight": 68,
                "service_role": "psychiatric",
                "verification_level": "blue",
                "hypoallergenic_rating": "high"
            }
        }
    
    def to_public_summary(self, handler_name: str) -> PublicStatusSummary:
        """Convert to ADA-safe public summary for business verification."""
        # This would be populated from related records
        return PublicStatusSummary(
            dog_id=self.id,
            dog_name=self.name,
            dog_photo_url=self.photo_url,
            handler_name=handler_name,
            verification_level=self.verification_level,
            service_role=self.service_role,
            tasks_description="",  # Would be populated from training records
            vaccination_status="current",  # Would be computed from records
            training_verified=False,  # Would be computed
            vet_verified=False,  # Would be computed
            public_access_test_passed=False,  # Would be computed
            behavior_status="calm"
        )
