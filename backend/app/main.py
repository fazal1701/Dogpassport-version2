from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import CORS_ORIGINS
from .api import (
    routes_dogs,
    routes_records,
    routes_analysis,
    routes_business,
    routes_admin
)

app = FastAPI(
    title="Dog Passport API",
    description="Backend API for Dog Passport app - Pet Identity Infrastructure",
    version="2.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
# Handler routes (legacy - for backward compatibility)
app.include_router(routes_dogs.router)
app.include_router(routes_records.router)
app.include_router(routes_analysis.router)

# Business portal routes (public verification - ADA-safe)
app.include_router(routes_business.router)

# Admin portal routes (internal scores, review queue)
app.include_router(routes_admin.router)


@app.get("/")
async def root():
    """Root endpoint - API health check."""
    return {
        "message": "Dog Passport API",
        "version": "1.0.0",
        "status": "running"
    }


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "healthy"}

