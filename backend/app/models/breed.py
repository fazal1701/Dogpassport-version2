"""
Breed capability matrix - used for internal recommendations and review flags.
NEVER used for public access denial (ADA compliance).
"""
from typing import List, Optional
from pydantic import BaseModel
from .verification import ServiceRole


class BreedCapability(BaseModel):
    """Breed-specific capabilities and health profile."""
    breed_name: str
    
    # Service role suitability (for recommendations only)
    ideal_service_roles: List[ServiceRole]
    suitable_service_roles: List[ServiceRole]
    
    # Typical characteristics
    typical_weight_range: tuple[float, float]  # (min_lbs, max_lbs)
    typical_temperament: List[str]  # e.g., ["calm", "alert", "trainable"]
    working_suitability: str  # "excellent" | "good" | "moderate" | "challenging"
    
    # Health profile
    common_health_issues: List[str]
    recommended_screenings: List[str]  # e.g., ["hip_dysplasia", "elbow_dysplasia", "eye_exam"]
    screening_frequency: dict[str, str]  # e.g., {"hip_dysplasia": "every_18_months"}
    
    # Notes
    notes: Optional[str] = None


# Breed database (would be in a real DB)
BREED_DATABASE = {
    "Labrador Retriever": BreedCapability(
        breed_name="Labrador Retriever",
        ideal_service_roles=[ServiceRole.GUIDE, ServiceRole.MOBILITY, ServiceRole.MEDICAL_ALERT],
        suitable_service_roles=[ServiceRole.PSYCHIATRIC, ServiceRole.AUTISM_SUPPORT],
        typical_weight_range=(55.0, 80.0),
        typical_temperament=["friendly", "outgoing", "trainable", "calm"],
        working_suitability="excellent",
        common_health_issues=["hip_dysplasia", "elbow_dysplasia", "bloat", "eye_issues"],
        recommended_screenings=["hip_dysplasia", "elbow_dysplasia", "eye_exam", "cardiac"],
        screening_frequency={
            "hip_dysplasia": "every_18_months",
            "elbow_dysplasia": "every_18_months",
            "eye_exam": "annually"
        }
    ),
    "Golden Retriever": BreedCapability(
        breed_name="Golden Retriever",
        ideal_service_roles=[ServiceRole.GUIDE, ServiceRole.PSYCHIATRIC, ServiceRole.AUTISM_SUPPORT],
        suitable_service_roles=[ServiceRole.MOBILITY, ServiceRole.MEDICAL_ALERT],
        typical_weight_range=(55.0, 75.0),
        typical_temperament=["gentle", "calm", "intelligent", "patient"],
        working_suitability="excellent",
        common_health_issues=["hip_dysplasia", "elbow_dysplasia", "cancer", "heart_disease"],
        recommended_screenings=["hip_dysplasia", "elbow_dysplasia", "eye_exam", "cardiac"],
        screening_frequency={
            "hip_dysplasia": "every_18_months",
            "elbow_dysplasia": "every_18_months",
            "eye_exam": "annually"
        }
    ),
    # Add more breeds as needed
}

