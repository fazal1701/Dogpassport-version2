"""Audit service - log events."""
from ..models.audit import AuditEvent, EventType
from datetime import datetime
from ..core.database import FAKE_DB


def log_audit_event(
    event_type: EventType,
    actor_id: str,
    actor_type: str,
    dog_id: str = None,
    record_id: str = None,
    organization_id: str = None,
    metadata: dict = None,
    success: bool = True,
    error_message: str = None
):
    """Log an audit event."""
    import uuid
    
    event = AuditEvent(
        id=str(uuid.uuid4()),
        event_type=event_type,
        timestamp=datetime.now(),
        actor_id=actor_id,
        actor_type=actor_type,
        dog_id=dog_id,
        record_id=record_id,
        organization_id=organization_id,
        metadata=metadata or {},
        success=success,
        error_message=error_message
    )
    
    # Store in fake DB (would be real DB in production)
    if "audit_events" not in FAKE_DB:
        FAKE_DB["audit_events"] = []
    FAKE_DB["audit_events"].append(event)
    
    return event

