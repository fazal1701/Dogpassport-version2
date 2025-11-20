"""
Document AI Processing Service

Handles OCR, classification, and extraction from uploaded documents.
This is where the "Vet Wallet AI" lives.
"""
from typing import Dict, Any, Optional
from datetime import datetime
from ..models.document import (
    RawDocument,
    NormalizedRecord,
    DocumentType,
    WalletCategory,
    DocumentStatus
)


class DocumentAIService:
    """
    Fake AI service for document processing.
    In production, this would call actual OCR/ML services.
    """
    
    @staticmethod
    async def process_document(raw_doc: RawDocument) -> Dict[str, Any]:
        """
        Process a raw document:
        1. OCR/extract text
        2. Classify document type
        3. Extract structured fields
        4. Suggest wallet category
        5. Return confidence score
        """
        # Fake processing - in production this would:
        # - Call OCR service (Tesseract, AWS Textract, etc.)
        # - Use ML model for classification
        # - Use NLP/LLM for field extraction
        
        # Simulate processing delay
        import asyncio
        await asyncio.sleep(0.1)
        
        # Fake classification based on filename
        filename_lower = raw_doc.filename.lower()
        
        detected_type = DocumentAIService._classify_document(filename_lower)
        wallet_category = DocumentAIService._suggest_wallet_category(detected_type)
        extracted_data = DocumentAIService._extract_fields(filename_lower, detected_type)
        
        # Confidence score (fake)
        confidence = 0.85 if "fake" not in filename_lower else 0.45
        
        return {
            "detected_type": detected_type,
            "wallet_category": wallet_category,
            "extracted_data": extracted_data,
            "confidence_score": confidence,
            "status": DocumentStatus.PROCESSED if confidence > 0.7 else DocumentStatus.MANUAL_REVIEW
        }
    
    @staticmethod
    def _classify_document(filename: str) -> DocumentType:
        """Classify document type from filename/content."""
        filename_lower = filename.lower()
        
        if "rabies" in filename_lower:
            return DocumentType.RABIES_CERTIFICATE
        elif "dhpp" in filename_lower or "dhlpp" in filename_lower:
            return DocumentType.DHPP
        elif "hip" in filename_lower and "screen" in filename_lower:
            return DocumentType.HIP_SCREENING
        elif "elbow" in filename_lower:
            return DocumentType.ELBOW_SCREENING
        elif "eye" in filename_lower or "ophthal" in filename_lower:
            return DocumentType.EYE_SCREENING
        elif "cardiac" in filename_lower or "heart" in filename_lower:
            return DocumentType.CARDIAC_SCREENING
        elif "wellness" in filename_lower or "annual" in filename_lower:
            return DocumentType.WELLNESS_EXAM
        elif "task" in filename_lower and "attest" in filename_lower:
            return DocumentType.SERVICE_TASK_ATTESTATION
        elif "train" in filename_lower and "cert" in filename_lower:
            return DocumentType.TRAINING_CERTIFICATE
        elif "public" in filename_lower and "access" in filename_lower:
            return DocumentType.PUBLIC_ACCESS_TEST
        elif "health" in filename_lower and "cert" in filename_lower:
            return DocumentType.HEALTH_CERTIFICATE
        elif "surgery" in filename_lower:
            return DocumentType.SURGERY_REPORT
        elif "prescription" in filename_lower or "rx" in filename_lower:
            return DocumentType.PRESCRIPTION
        else:
            return DocumentType.OTHER
    
    @staticmethod
    def _suggest_wallet_category(doc_type: DocumentType) -> WalletCategory:
        """Suggest wallet category based on document type."""
        if doc_type in [
            DocumentType.RABIES_CERTIFICATE,
            DocumentType.DHPP
        ]:
            return WalletCategory.VACCINATIONS
        
        elif doc_type in [
            DocumentType.WELLNESS_EXAM,
            DocumentType.HIP_SCREENING,
            DocumentType.ELBOW_SCREENING,
            DocumentType.EYE_SCREENING,
            DocumentType.CARDIAC_SCREENING,
            DocumentType.HEALTH_CERTIFICATE,
            DocumentType.SURGERY_REPORT,
            DocumentType.PRESCRIPTION
        ]:
            return WalletCategory.MEDICAL_RECORDS
        
        elif doc_type in [
            DocumentType.SERVICE_TASK_ATTESTATION,
            DocumentType.TRAINING_CERTIFICATE,
            DocumentType.PUBLIC_ACCESS_TEST
        ]:
            return WalletCategory.TRAINING_VERIFICATION
        
        else:
            return WalletCategory.IDENTITY_OWNERSHIP
    
    @staticmethod
    def _extract_fields(filename: str, doc_type: DocumentType) -> Dict[str, Any]:
        """Extract structured fields from document (fake extraction)."""
        # In production, this would use NLP/LLM to extract:
        # - Dates
        # - Vet/clinic names
        # - Vaccine names
        # - Results/grades
        # - etc.
        
        extracted = {
            "source_filename": filename
        }
        
        # Fake extraction based on document type
        if doc_type == DocumentType.RABIES_CERTIFICATE:
            extracted.update({
                "vaccine_name": "Rabies",
                "date_administered": "2024-03-15",  # Would extract from OCR
                "expiration_date": "2026-03-15",
                "vet_name": "Dr. Example",
                "clinic": "Example Animal Hospital"
            })
        elif doc_type == DocumentType.SERVICE_TASK_ATTESTATION:
            extracted.update({
                "trainer_name": "Example Training Institute",
                "date_completed": "2024-06-01",
                "tasks_certified": ["PTSD alert", "Grounding techniques"]
            })
        
        return extracted

