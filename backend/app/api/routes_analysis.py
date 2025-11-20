from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..services.analysis_service import analyze_record
from ..services.dog_service import get_dog

router = APIRouter(tags=["analysis"])


class AnalyzeRequest(BaseModel):
    dog_id: str
    record_id: str


@router.post("/analyze-record")
async def analyze_record_endpoint(request: AnalyzeRequest):
    """
    Analyze a record using fake AI verification engine.
    
    Rules:
    - Filenames containing "fake" or "invalid" will be denied
    - All other records will be accepted
    """
    result = analyze_record(request.dog_id, request.record_id)
    
    if "error" in result:
        raise HTTPException(status_code=404, detail=result["error"])
    
    return result

