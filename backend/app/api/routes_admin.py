"""
Admin Portal API Routes

For internal admin/ops team.
Returns internal scores, fraud flags, and review queues.
NEVER exposed to businesses or public APIs.
"""
from fastapi import APIRouter, HTTPException
from typing import List
from ..models.verification import InternalVerificationScores
from ..models.dog import Dog
from ..services.dog_service import get_dog
from ..services.verification_engine import VerificationEngine
from ..services.record_service import get_dog_records

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/dogs/{dog_id}/internal-scores")
async def get_internal_scores(dog_id: str):
    """
    Get internal verification scores for a dog.
    ADMIN ONLY - never exposed to businesses.
    
    Returns:
    - Internal scores (service_eligibility, training_evidence, etc.)
    - Fraud flags
    - Mismatch flags
    - Review requirements
    """
    dog = get_dog(dog_id)
    if not dog:
        raise HTTPException(status_code=404, detail="Dog not found")
    
    records = get_dog_records(dog_id)
    
    # Compute internal scores
    internal_scores = VerificationEngine.compute_internal_scores(dog, records)
    
    return {
        "dog_id": dog_id,
        "internal_scores": internal_scores,
        "verification_level": dog.verification_level.value
    }


@router.get("/review-queue")
async def get_review_queue():
    """
    Get list of dogs requiring human review.
    Based on internal flags and scores.
    """
    # In production, query database for dogs with requires_human_review=True
    # For now, return empty list
    return {
        "queue": [],
        "count": 0
    }


@router.get("/fraud-flags")
async def get_fraud_flags():
    """
    Get list of dogs with fraud flags.
    ADMIN ONLY.
    """
    # In production, query database for dogs with fraud_flags
    return {
        "flagged_dogs": [],
        "count": 0
    }

