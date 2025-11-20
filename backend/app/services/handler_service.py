"""Handler service - get handler data."""
from typing import Optional
from ..models.handler import Handler
from ..core.database import FAKE_DB


def get_handler(handler_id: str) -> Optional[Handler]:
    """Get handler by ID."""
    return FAKE_DB.get("handlers", {}).get(handler_id)

