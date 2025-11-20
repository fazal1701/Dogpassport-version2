"""
Audit trail models - track all important events for compliance and debugging.
"""
from typing import Optional, Dict, Any
from datetime import datetime
from enum import Enum
from pydantic import BaseModel


class EventType(str, Enum):
    """Types of events to audit."""
    # Verification events
    VERIFICATION_LEVEL_CHANGED = "verification_level_changed"
    VERIFICATION_REVIEWED = "verification_reviewed"
    
    # Document events
    DOCUMENT_UPLOADED = "document_uploaded"
    DOCUMENT_PROCESSED = "document_processed"
    DOCUMENT_VERIFIED = "document_verified"
    
    # Scan events
    QR_CODE_SCANNED = "qr_code_scanned"
    NFC_TAPPED = "nfc_tapped"
    
    # Access events
    ACCESS_GRANTED = "access_granted"
    ACCESS_DENIED = "access_denied"
    
    # Admin events
    MANUAL_OVERRIDE = "manual_override"
    FRAUD_FLAG_SET = "fraud_flag_set"
    FRAUD_FLAG_CLEARED = "fraud_flag_cleared"


class AuditEvent(BaseModel):
    """Single audit event."""
    id: str
    event_type: EventType
    timestamp: datetime
    
    # Who
    actor_id: str  # handler_id, vet_id, admin_id, organization_id
    actor_type: str  # "handler" | "vet" | "trainer" | "business" | "admin" | "system"
    
    # What
    dog_id: Optional[str] = None
    record_id: Optional[str] = None
    organization_id: Optional[str] = None
    
    # Details
    metadata: Dict[str, Any] = {}
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    
    # Result
    success: bool = True
    error_message: Optional[str] = None

