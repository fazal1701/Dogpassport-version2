"""
In-memory fake database for development.
This can be replaced with a real database later.
"""
from ..models.dog import Dog
from ..models.record import Record

# Initialize with sample data
FAKE_DB = {
    "dogs": {
        "buddy": Dog(
            id="buddy",
            name="Buddy",
            breed="Golden Retriever",
            service_type="PTSD",
            records=[],
            verified=False
        ),
        "luna": Dog(
            id="luna",
            name="Luna",
            breed="Labrador Retriever",
            service_type="mobility",
            records=[],
            verified=False
        ),
    }
}

