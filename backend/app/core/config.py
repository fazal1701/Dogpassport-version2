from typing import List

# CORS settings
CORS_ORIGINS: List[str] = [
    "http://localhost:3000",  # Next.js dev server
    "http://localhost:3001",  # Alternative port
    "*"  # Allow all for development (restrict in production)
]

# API settings
API_PREFIX: str = "/api"
API_VERSION: str = "v1"

