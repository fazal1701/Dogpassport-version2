"""
Verification models - separates internal scores from public-facing status.
Critical for ADA compliance: internal flags/scores are NEVER exposed to businesses.
"""
from typing import Optional, List
from datetime import datetime
from enum import Enum
from pydantic import BaseModel, Field


class VerificationLevel(str, Enum):
    """Public-facing verification levels."""
    YELLOW = "yellow"  # Temporary - incomplete records
    GREEN = "green"    # Complete - all required records present
    BLUE = "blue"      # Premium verified - vet + trainer verified


class ServiceRole(str, Enum):
    """Service dog task types."""
    MOBILITY = "mobility"
    GUIDE = "guide"
    PSYCHIATRIC = "psychiatric"
    MEDICAL_ALERT = "medical_alert"
    AUTISM_SUPPORT = "autism_support"
    HEARING = "hearing"


class PublicStatusSummary(BaseModel):
    """
    ADA-safe public status - what businesses can see.
    NO breed warnings, NO internal scores, NO fraud flags.
    """
    dog_id: str
    dog_name: str
    dog_photo_url: Optional[str] = None
    handler_name: str
    verification_level: VerificationLevel
    service_role: ServiceRole
    tasks_description: str  # High-level task description (not medical details)
    vaccination_status: str  # "current" | "expiring_soon" | "expired"
    training_verified: bool
    vet_verified: bool
    public_access_test_passed: bool
    behavior_status: str  # "calm" | "controlled" | "under_review"
    
    # QR code data (for scanning)
    qr_code_url: Optional[str] = None
    nfc_token: Optional[str] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "dog_id": "buddy",
                "dog_name": "Buddy",
                "handler_name": "John Doe",
                "verification_level": "blue",
                "service_role": "psychiatric",
                "tasks_description": "PTSD alert and grounding techniques",
                "vaccination_status": "current",
                "training_verified": True,
                "vet_verified": True,
                "public_access_test_passed": True,
                "behavior_status": "calm"
            }
        }


class InternalVerificationScores(BaseModel):
    """
    INTERNAL ONLY - never exposed to businesses or public APIs.
    Used for admin review and verification decisions.
    """
    dog_id: str
    service_eligibility_score: float = Field(ge=0.0, le=1.0)  # 0-1 scale
    training_evidence_score: float = Field(ge=0.0, le=1.0)
    health_completeness_score: float = Field(ge=0.0, le=1.0)
    task_breed_compatibility_score: float = Field(ge=0.0, le=1.0)
    
    # Flags (internal review only)
    fraud_flags: List[str] = Field(default_factory=list)
    mismatch_flags: List[str] = Field(default_factory=list)
    requires_human_review: bool = False
    review_reason: Optional[str] = None
    
    # Audit
    last_updated: datetime
    updated_by: str  # "system" | "admin_id" | "vet_id"
    
    class Config:
        json_schema_extra = {
            "example": {
                "dog_id": "buddy",
                "service_eligibility_score": 0.95,
                "training_evidence_score": 0.88,
                "health_completeness_score": 0.92,
                "task_breed_compatibility_score": 0.90,
                "fraud_flags": [],
                "mismatch_flags": ["size_vs_task_review_required"],
                "requires_human_review": True,
                "review_reason": "Small breed for mobility task - requires additional documentation"
            }
        }


class VerificationHistory(BaseModel):
    """Audit trail of verification changes."""
    id: str
    dog_id: str
    from_level: Optional[VerificationLevel]
    to_level: VerificationLevel
    reason: str
    changed_by: str  # "system" | "admin_id" | "vet_id" | "trainer_id"
    changed_at: datetime
    notes: Optional[str] = None

