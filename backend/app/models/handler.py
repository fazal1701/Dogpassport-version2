"""
Handler (user) models - represents dog owners/handlers.
"""
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, EmailStr


class Handler(BaseModel):
    """Handler/owner account."""
    id: str
    email: EmailStr
    name: str
    phone: Optional[str] = None
    subscription_tier: str = "free"  # "free" | "premium"
    subscription_expires_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    
    # Linked dogs
    dog_ids: List[str] = []


class HandlerProfile(BaseModel):
    """Public handler profile (minimal for business verification)."""
    handler_id: str
    handler_name: str
    # No email/phone exposed to businesses

