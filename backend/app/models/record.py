from typing import Optional, List
from datetime import date
from pydantic import BaseModel


class Record(BaseModel):
    id: str
    dog_id: str
    filename: str
    category: str  # e.g., "vaccination", "training", "vet_visit", "travel"
    status: str = "uploaded"  # "uploaded" | "analyzed"
    expires_at: Optional[date] = None
    analysis_status: Optional[str] = None  # "accepted" | "denied"
    risk_score: Optional[float] = None
    issues: Optional[List[str]] = None

    class Config:
        json_schema_extra = {
            "example": {
                "id": "record-123",
                "dog_id": "buddy",
                "filename": "vaccination_cert.pdf",
                "category": "vaccination",
                "status": "uploaded",
                "expires_at": "2025-12-31",
                "analysis_status": None,
                "risk_score": None,
                "issues": None
            }
        }

