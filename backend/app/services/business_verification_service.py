"""
Business Verification Service

Public-facing service for businesses to verify dogs.
CRITICAL: Only returns ADA-safe information - NO internal scores, NO breed warnings.
"""
from typing import Optional
from ..models.verification import PublicStatusSummary
from ..models.dog import Dog
from ..models.document import NormalizedRecord, WalletCategory
from ..models.handler import Handler


class BusinessVerificationService:
    """
    Service for businesses to verify service dogs.
    Returns ONLY ADA-safe public information.
    """
    
    @staticmethod
    def get_public_status(
        dog: Dog,
        handler: Handler,
        records: list  # Can be NormalizedRecord or legacy Record
    ) -> PublicStatusSummary:
        """
        Get ADA-safe public status summary for business verification.
        
        This is what businesses see when they scan a QR code.
        NO internal scores, NO breed warnings, NO fraud flags.
        """
        # Compute vaccination status
        vaccination_status = BusinessVerificationService._compute_vaccination_status(
            records
        )
        
        # Check training verification (handle both NormalizedRecord and legacy Record)
        training_verified = False
        if records:
            # Try NormalizedRecord format
            if hasattr(records[0], 'wallet_category'):
                training_verified = any(
                    hasattr(r, 'wallet_category') and
                    r.wallet_category == WalletCategory.TRAINING_VERIFICATION
                    and getattr(r, 'trainer_verified', False)
                    and getattr(r, 'is_active', True)
                    for r in records
                )
            # Try legacy Record format
            elif hasattr(records[0], 'category'):
                training_verified = any(
                    r.category == "training" and
                    getattr(r, 'analysis_status', None) == "accepted"
                    for r in records
                )
        
        # Check vet verification
        vet_verified = False
        if records:
            if hasattr(records[0], 'vet_verified'):
                vet_verified = any(
                    getattr(r, 'vet_verified', False) and
                    getattr(r, 'is_active', True)
                    for r in records
                )
        
        # Check public access test
        public_access_passed = False
        if records:
            if hasattr(records[0], 'document_type'):
                public_access_passed = any(
                    hasattr(r, 'document_type') and
                    getattr(r.document_type, 'value', '') == "public_access_test"
                    and getattr(r, 'is_active', True)
                    for r in records
                )
        
        # Behavior status (would be updated from recent scans/incidents)
        behavior_status = "calm"  # Would be computed from recent audit events
        
        # Get task description from training records
        tasks_description = BusinessVerificationService._extract_tasks_description(
            records
        )
        
        return PublicStatusSummary(
            dog_id=dog.id,
            dog_name=dog.name,
            dog_photo_url=dog.photo_url,
            handler_name=handler.name,
            verification_level=dog.verification_level,
            service_role=dog.service_role,
            tasks_description=tasks_description,
            vaccination_status=vaccination_status,
            training_verified=training_verified,
            vet_verified=vet_verified,
            public_access_test_passed=public_access_passed,
            behavior_status=behavior_status,
            qr_code_url=f"/qr/{dog.id}",  # Would be actual QR code URL
            nfc_token=f"nfc_{dog.id}"  # Would be actual NFC token
        )
    
    @staticmethod
    def _compute_vaccination_status(records: list) -> str:
        """Compute vaccination status from records."""
        from datetime import date
        
        if not records:
            return "expired"
        
        # Handle NormalizedRecord format
        if hasattr(records[0], 'wallet_category'):
            vaccination_records = [
                r for r in records
                if hasattr(r, 'wallet_category') and
                r.wallet_category == WalletCategory.VACCINATIONS
                and getattr(r, 'is_active', True)
            ]
        # Handle legacy Record format
        elif hasattr(records[0], 'category'):
            vaccination_records = [
                r for r in records
                if r.category == "vaccination"
                and getattr(r, 'analysis_status', None) != "denied"
            ]
        else:
            vaccination_records = []
        
        if not vaccination_records:
            return "expired"
        
        # Check if any are expiring soon (within 30 days)
        today = date.today()
        expiring_soon = any(
            r.expiration_date
            and (r.expiration_date - today).days <= 30
            for r in vaccination_records
        )
        
        if expiring_soon:
            return "expiring_soon"
        
        # Check if any are expired
        expired = any(
            r.expiration_date
            and r.expiration_date < today
            for r in vaccination_records
        )
        
        if expired:
            return "expired"
        
        return "current"
    
    @staticmethod
    def _extract_tasks_description(records: list) -> str:
        """Extract task description from training records."""
        if not records:
            return "Service dog tasks"
        
        # Handle NormalizedRecord format
        if hasattr(records[0], 'wallet_category'):
            training_records = [
                r for r in records
                if hasattr(r, 'wallet_category') and
                r.wallet_category == WalletCategory.TRAINING_VERIFICATION
            ]
            
            for record in training_records:
                if hasattr(record, 'extracted_data'):
                    tasks = record.extracted_data.get("tasks_certified", [])
                    if tasks:
                        return ", ".join(tasks)
        
        return "Service dog tasks"

