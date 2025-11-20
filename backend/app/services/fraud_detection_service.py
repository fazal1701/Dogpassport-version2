"""
Fraud Detection Service

Detects potential fraud and abuse.
INTERNAL ONLY - flags are never exposed to businesses or public APIs.
"""
from typing import List, Dict, Any
from ..models.document import RawDocument
from ..models.dog import Dog


class FraudDetectionService:
    """
    Detects fraud patterns:
    - Document deduplication (same file used for multiple dogs)
    - Inconsistent data (same microchip, different dogs)
    - Reused PDFs across handlers
    """
    
    @staticmethod
    def check_document_fraud(
        new_document: RawDocument,
        existing_documents: List[RawDocument]
    ) -> List[str]:
        """
        Check if a new document is potentially fraudulent.
        Returns list of fraud flags (empty if clean).
        """
        flags = []
        
        # Check for duplicate file hash
        duplicate_hash = any(
            doc.file_hash == new_document.file_hash
            and doc.dog_id != new_document.dog_id
            for doc in existing_documents
        )
        if duplicate_hash:
            flags.append("Document hash matches another dog's document - possible reuse")
        
        # Check for suspicious filename patterns
        if "fake" in new_document.filename.lower():
            flags.append("Filename suggests fake document")
        
        if "invalid" in new_document.filename.lower():
            flags.append("Filename suggests invalid document")
        
        return flags
    
    @staticmethod
    def check_dog_consistency(
        dog: Dog,
        all_dogs: List[Dog]
    ) -> List[str]:
        """
        Check for data inconsistencies across dogs.
        Returns list of inconsistency flags.
        """
        flags = []
        
        # Check for duplicate microchip
        if dog.microchip:
            duplicate_chip = any(
                d.microchip == dog.microchip
                and d.id != dog.id
                for d in all_dogs
            )
            if duplicate_chip:
                flags.append(f"Microchip {dog.microchip} used by multiple dogs")
        
        # Check for suspicious photo reuse (would need image hashing)
        # Placeholder for image similarity detection
        
        return flags
    
    @staticmethod
    def compute_fraud_risk_score(
        fraud_flags: List[str],
        inconsistency_flags: List[str]
    ) -> float:
        """
        Compute overall fraud risk score (0-1).
        Higher = more suspicious.
        """
        if not fraud_flags and not inconsistency_flags:
            return 0.0
        
        # Weight fraud flags more heavily
        score = len(fraud_flags) * 0.3 + len(inconsistency_flags) * 0.1
        
        return min(score, 1.0)

