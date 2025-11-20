"""
Service Dog Verification Engine

Computes internal scores and determines verification levels.
Critical: Internal scores/flags are NEVER exposed to businesses (ADA compliance).

This engine:
- Evaluates service eligibility based on records
- Checks breed-task compatibility (internal flag only, not public denial)
- Computes health completeness
- Determines verification level (Yellow/Green/Blue)
- Flags cases requiring human review
"""
from typing import Dict, Any, Optional, List
from datetime import datetime
from ..models.verification import (
    VerificationLevel,
    ServiceRole,
    InternalVerificationScores,
    VerificationHistory
)
from ..models.dog import Dog
from ..models.document import NormalizedRecord, WalletCategory
from ..models.breed import BREED_DATABASE


class VerificationEngine:
    """
    Core verification logic.
    Separates internal scoring from public-facing status.
    """
    
    @staticmethod
    def compute_internal_scores(
        dog: Dog,
        records: List[NormalizedRecord]
    ) -> InternalVerificationScores:
        """
        Compute all internal scores for a dog.
        These scores are used for internal review and verification decisions.
        NEVER exposed to businesses or public APIs.
        """
        # Service eligibility score
        service_eligibility = VerificationEngine._compute_service_eligibility_score(
            dog, records
        )
        
        # Training evidence score
        training_score = VerificationEngine._compute_training_evidence_score(records)
        
        # Health completeness score
        health_score = VerificationEngine._compute_health_completeness_score(
            dog, records
        )
        
        # Task-breed compatibility score (internal flag only)
        compatibility_score = VerificationEngine._compute_compatibility_score(dog)
        
        # Generate flags
        fraud_flags, mismatch_flags = VerificationEngine._generate_flags(
            dog, records
        )
        
        requires_review = (
            len(fraud_flags) > 0 or
            len(mismatch_flags) > 0 or
            service_eligibility < 0.7 or
            training_score < 0.7
        )
        
        review_reason = None
        if requires_review:
            if mismatch_flags:
                review_reason = "; ".join(mismatch_flags)
            elif fraud_flags:
                review_reason = "Fraud flags detected"
            else:
                review_reason = "Low scores require review"
        
        return InternalVerificationScores(
            dog_id=dog.id,
            service_eligibility_score=service_eligibility,
            training_evidence_score=training_score,
            health_completeness_score=health_score,
            task_breed_compatibility_score=compatibility_score,
            fraud_flags=fraud_flags,
            mismatch_flags=mismatch_flags,
            requires_human_review=requires_review,
            review_reason=review_reason,
            last_updated=datetime.now(),
            updated_by="system"
        )
    
    @staticmethod
    def determine_verification_level(
        dog: Dog,
        records: List[NormalizedRecord],
        internal_scores: InternalVerificationScores
    ) -> VerificationLevel:
        """
        Determine public-facing verification level based on records and scores.
        This is what businesses see - NO breed-based denials.
        """
        # Yellow: Incomplete records
        has_vaccination = any(
            r.wallet_category == WalletCategory.VACCINATIONS
            and r.is_active
            for r in records
        )
        
        has_training = any(
            r.wallet_category == WalletCategory.TRAINING_VERIFICATION
            and r.is_active
            for r in records
        )
        
        if not has_vaccination or not has_training:
            return VerificationLevel.YELLOW
        
        # Green: Complete records, but not verified by vet/trainer
        vet_verified_records = any(r.vet_verified for r in records)
        trainer_verified_records = any(r.trainer_verified for r in records)
        
        if not vet_verified_records or not trainer_verified_records:
            return VerificationLevel.GREEN
        
        # Blue: Premium verified - vet + trainer verified, high scores
        if (
            internal_scores.service_eligibility_score >= 0.8 and
            internal_scores.training_evidence_score >= 0.8 and
            internal_scores.health_completeness_score >= 0.8 and
            not internal_scores.requires_human_review
        ):
            return VerificationLevel.BLUE
        
        # If scores are good but needs review, stay at Green until reviewed
        return VerificationLevel.GREEN
    
    @staticmethod
    def _compute_service_eligibility_score(
        dog: Dog,
        records: List[NormalizedRecord]
    ) -> float:
        """Score based on completeness of required service dog documentation."""
        score = 0.0
        
        # Has vaccination records (required)
        has_rabies = any(
            r.document_type.value == "rabies_certificate" and r.is_active
            for r in records
        )
        if has_rabies:
            score += 0.3
        
        # Has training attestation
        has_training = any(
            r.document_type.value == "service_task_attestation" and r.is_active
            for r in records
        )
        if has_training:
            score += 0.3
        
        # Has public access test
        has_pat = any(
            r.document_type.value == "public_access_test" and r.is_active
            for r in records
        )
        if has_pat:
            score += 0.2
        
        # Has health screenings (breed-appropriate)
        has_screenings = any(
            "screening" in r.document_type.value and r.is_active
            for r in records
        )
        if has_screenings:
            score += 0.2
        
        return min(score, 1.0)
    
    @staticmethod
    def _compute_training_evidence_score(records: List[NormalizedRecord]) -> float:
        """Score based on training documentation quality."""
        training_records = [
            r for r in records
            if r.wallet_category == WalletCategory.TRAINING_VERIFICATION
        ]
        
        if not training_records:
            return 0.0
        
        score = 0.5  # Base score for having training records
        
        # Trainer verified
        if any(r.trainer_verified for r in training_records):
            score += 0.3
        
        # Recent training (within 2 years)
        recent_training = any(
            r.record_date.year >= datetime.now().year - 2
            for r in training_records
        )
        if recent_training:
            score += 0.2
        
        return min(score, 1.0)
    
    @staticmethod
    def _compute_health_completeness_score(
        dog: Dog,
        records: List[NormalizedRecord]
    ) -> float:
        """Score based on health record completeness."""
        score = 0.0
        
        # Required vaccinations
        has_rabies = any(
            r.document_type.value == "rabies_certificate" and r.is_active
            for r in records
        )
        has_dhpp = any(
            r.document_type.value == "dhpp" and r.is_active
            for r in records
        )
        
        if has_rabies:
            score += 0.3
        if has_dhpp:
            score += 0.2
        
        # Breed-appropriate screenings
        breed_info = BREED_DATABASE.get(dog.breed)
        if breed_info:
            recommended = breed_info.recommended_screenings
            completed = sum(
                1 for r in records
                if any(screening in r.document_type.value for screening in recommended)
                and r.is_active
            )
            if recommended:
                score += 0.3 * (completed / len(recommended))
        
        # Vet verified records
        vet_verified_count = sum(1 for r in records if r.vet_verified)
        if vet_verified_count > 0:
            score += 0.2
        
        return min(score, 1.0)
    
    @staticmethod
    def _compute_compatibility_score(dog: Dog) -> float:
        """
        Compute breed-task compatibility score.
        This is INTERNAL ONLY - used for review flags, NOT public denial.
        """
        breed_info = BREED_DATABASE.get(dog.breed)
        if not breed_info:
            return 0.5  # Unknown breed, neutral score
        
        # Check if service role is ideal or suitable
        if dog.service_role in breed_info.ideal_service_roles:
            return 1.0
        elif dog.service_role in breed_info.suitable_service_roles:
            return 0.8
        else:
            # Not ideal but not impossible - flag for review
            return 0.6
    
    @staticmethod
    def _generate_flags(
        dog: Dog,
        records: List[NormalizedRecord]
    ) -> tuple[List[str], List[str]]:
        """
        Generate fraud and mismatch flags.
        These are INTERNAL ONLY - never exposed to businesses.
        """
        fraud_flags = []
        mismatch_flags = []
        
        # Size vs task mismatch (for mobility tasks)
        if dog.service_role == ServiceRole.MOBILITY:
            if dog.weight and dog.weight < 50:
                mismatch_flags.append(
                    f"Small size ({dog.weight} lbs) for mobility task - requires additional documentation"
                )
        
        # Breed-task compatibility (internal flag only)
        breed_info = BREED_DATABASE.get(dog.breed)
        if breed_info:
            if dog.service_role not in breed_info.ideal_service_roles:
                if dog.service_role not in breed_info.suitable_service_roles:
                    mismatch_flags.append(
                        f"Breed-task mismatch: {dog.breed} not typically used for {dog.service_role.value}"
                    )
        
        # Missing required screenings for breed
        if breed_info:
            required = breed_info.recommended_screenings[:2]  # Top 2 most important
            for screening in required:
                has_screening = any(
                    screening in r.document_type.value and r.is_active
                    for r in records
                )
                if not has_screening:
                    mismatch_flags.append(
                        f"Missing recommended screening: {screening} for {dog.breed}"
                    )
        
        # Document deduplication would be checked here (fraud detection)
        # For now, placeholder
        
        return fraud_flags, mismatch_flags

