"""
Document models - separates raw uploaded documents from normalized medical records.
Supports AI document processing pipeline.
"""
from typing import Optional, List, Dict, Any
from datetime import datetime, date
from enum import Enum
from pydantic import BaseModel, Field


class DocumentType(str, Enum):
    """Detected document types from AI processing."""
    RABIES_CERTIFICATE = "rabies_certificate"
    DHPP = "dhpp"
    HIP_SCREENING = "hip_screening"
    ELBOW_SCREENING = "elbow_screening"
    EYE_SCREENING = "eye_screening"
    CARDIAC_SCREENING = "cardiac_screening"
    WELLNESS_EXAM = "wellness_exam"
    SERVICE_TASK_ATTESTATION = "service_task_attestation"
    TRAINING_CERTIFICATE = "training_certificate"
    PUBLIC_ACCESS_TEST = "public_access_test"
    HEALTH_CERTIFICATE = "health_certificate"
    SURGERY_REPORT = "surgery_report"
    PRESCRIPTION = "prescription"
    OTHER = "other"


class WalletCategory(str, Enum):
    """Wallet organization categories."""
    VACCINATIONS = "vaccinations"
    MEDICAL_RECORDS = "medical_records"
    TRAINING_VERIFICATION = "training_verification"
    IDENTITY_OWNERSHIP = "identity_ownership"


class DocumentStatus(str, Enum):
    """Processing status of raw document."""
    UPLOADED = "uploaded"
    PROCESSING = "processing"
    PROCESSED = "processed"
    FAILED = "failed"
    MANUAL_REVIEW = "manual_review"


class RawDocument(BaseModel):
    """
    Raw uploaded document before AI processing.
    Stored separately from normalized records.
    """
    id: str
    dog_id: str
    handler_id: str
    filename: str
    file_url: str  # S3/storage URL
    file_hash: str  # For deduplication
    file_size: int
    mime_type: str
    uploaded_at: datetime
    uploaded_by: str  # "handler" | "vet_id" | "trainer_id"
    
    # AI processing
    status: DocumentStatus = DocumentStatus.UPLOADED
    detected_type: Optional[DocumentType] = None
    confidence_score: Optional[float] = None
    processing_error: Optional[str] = None
    
    # Link to normalized record (if processed)
    normalized_record_id: Optional[str] = None


class NormalizedRecord(BaseModel):
    """
    Structured medical/training record extracted from raw document.
    This is what appears in the wallet and drives verification.
    """
    id: str
    dog_id: str
    raw_document_id: Optional[str] = None  # Link back to source
    
    # Classification
    wallet_category: WalletCategory
    document_type: DocumentType
    
    # Extracted fields (varies by document type)
    extracted_data: Dict[str, Any] = Field(default_factory=dict)
    # Examples:
    # - vaccination: vaccine_name, date_administered, expiration_date, vet_name, clinic
    # - screening: screening_type, date, result, grade, vet_name
    # - training: trainer_name, organization, date_completed, tasks_certified
    
    # Dates
    record_date: date
    expiration_date: Optional[date] = None
    
    # Verification
    vet_verified: bool = False
    vet_id: Optional[str] = None
    vet_name: Optional[str] = None
    vet_verified_at: Optional[datetime] = None
    
    trainer_verified: bool = False
    trainer_id: Optional[str] = None
    trainer_name: Optional[str] = None
    trainer_verified_at: Optional[datetime] = None
    
    # Status
    is_active: bool = True
    is_expired: bool = False
    
    # Metadata
    created_at: datetime
    updated_at: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "rec-123",
                "dog_id": "buddy",
                "wallet_category": "vaccinations",
                "document_type": "rabies_certificate",
                "extracted_data": {
                    "vaccine_name": "Rabies",
                    "date_administered": "2024-03-15",
                    "expiration_date": "2026-03-15",
                    "vet_name": "Dr. Emily Chen",
                    "clinic": "Portland Animal Hospital"
                },
                "record_date": "2024-03-15",
                "expiration_date": "2026-03-15",
                "vet_verified": True,
                "vet_name": "Dr. Emily Chen"
            }
        }

