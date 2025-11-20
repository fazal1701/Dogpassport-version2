from typing import Optional
from uuid import uuid4
from ..models.record import Record
from ..core.database import FAKE_DB


def create_record(
    dog_id: str,
    filename: str,
    category: str
) -> Optional[Record]:
    """Create a new record for a dog."""
    # Check if dog exists
    if dog_id not in FAKE_DB["dogs"]:
        return None
    
    # Create new record
    record = Record(
        id=str(uuid4()),
        dog_id=dog_id,
        filename=filename,
        category=category,
        status="uploaded"
    )
    
    # Add to dog's records
    FAKE_DB["dogs"][dog_id].records.append(record)
    
    return record


def get_record(dog_id: str, record_id: str) -> Optional[Record]:
    """Get a specific record for a dog."""
    dog = FAKE_DB["dogs"].get(dog_id)
    if not dog:
        return None
    
    for record in dog.records:
        if record.id == record_id:
            return record
    
    return None


def get_dog_records(dog_id: str) -> list[Record]:
    """Get all records for a dog."""
    dog = FAKE_DB["dogs"].get(dog_id)
    if not dog:
        return []
    
    return dog.records


def update_record(
    dog_id: str,
    record_id: str,
    status: Optional[str] = None,
    analysis_status: Optional[str] = None,
    risk_score: Optional[float] = None,
    issues: Optional[list[str]] = None
) -> Optional[Record]:
    """Update a record's analysis information."""
    record = get_record(dog_id, record_id)
    if not record:
        return None
    
    if status is not None:
        record.status = status
    if analysis_status is not None:
        record.analysis_status = analysis_status
    if risk_score is not None:
        record.risk_score = risk_score
    if issues is not None:
        record.issues = issues
    
    return record

