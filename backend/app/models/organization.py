"""
Organization models - businesses, vets, trainers that use Dog Passport.
"""
from typing import Optional, List
from datetime import datetime
from enum import Enum
from pydantic import BaseModel, EmailStr


class OrganizationType(str, Enum):
    BUSINESS = "business"  # Airlines, hotels, restaurants, rideshares
    VET_CLINIC = "vet_clinic"
    TRAINER = "trainer"
    ADMIN = "admin"


class Organization(BaseModel):
    """Organization account (business, vet clinic, trainer)."""
    id: str
    name: str
    type: OrganizationType
    email: EmailStr
    phone: Optional[str] = None
    
    # Business-specific
    category: Optional[str] = None  # "airline" | "hotel" | "restaurant" | "rideshare"
    
    # Vet/Trainer-specific
    license_number: Optional[str] = None
    license_state: Optional[str] = None
    
    # Access control
    is_verified: bool = False
    api_key: Optional[str] = None  # For API access
    
    # Metadata
    created_at: datetime
    updated_at: datetime


class OrganizationUser(BaseModel):
    """User within an organization (staff member, vet, trainer)."""
    id: str
    organization_id: str
    email: EmailStr
    name: str
    role: str  # "manager" | "staff" | "vet" | "trainer" | "admin"
    permissions: List[str] = []  # e.g., ["scan_verify", "view_audit_logs"]
    created_at: datetime

