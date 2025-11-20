# Core models
from .dog import Dog
from .handler import Handler, HandlerProfile
from .verification import (
    VerificationLevel,
    ServiceRole,
    PublicStatusSummary,
    InternalVerificationScores,
    VerificationHistory
)

# Document models
from .document import (
    DocumentType,
    WalletCategory,
    DocumentStatus,
    RawDocument,
    NormalizedRecord
)

# Organization models
from .organization import (
    OrganizationType,
    Organization,
    OrganizationUser
)

# Breed models
from .breed import BreedCapability, BREED_DATABASE

# Audit models
from .audit import EventType, AuditEvent

# Legacy (for backward compatibility)
from .record import Record

__all__ = [
    # Core
    "Dog",
    "Handler",
    "HandlerProfile",
    # Verification
    "VerificationLevel",
    "ServiceRole",
    "PublicStatusSummary",
    "InternalVerificationScores",
    "VerificationHistory",
    # Documents
    "DocumentType",
    "WalletCategory",
    "DocumentStatus",
    "RawDocument",
    "NormalizedRecord",
    # Organizations
    "OrganizationType",
    "Organization",
    "OrganizationUser",
    # Breed
    "BreedCapability",
    "BREED_DATABASE",
    # Audit
    "EventType",
    "AuditEvent",
    # Legacy
    "Record",
]

