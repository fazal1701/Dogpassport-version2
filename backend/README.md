# Dog Passport Backend API

FastAPI backend for the Dog Passport application.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Upload Record
- **POST** `/records/upload`
  - Form data:
    - `dog_id`: str
    - `category`: str (e.g., "vaccination", "training", "vet_visit", "travel")
    - `file`: UploadFile

### List Dog Records
- **GET** `/records/dogs/{dog_id}/records`
  - Returns all records for a dog

### Analyze Record
- **POST** `/analysis/analyze`
  - JSON body:
    - `dog_id`: str
    - `record_id`: str
  - Fake AI logic: Files with "fake" or "invalid" in filename are denied

### Get Dog Status
- **GET** `/dogs/{dog_id}/status`
  - Returns dog's verification status

## Sample Dogs

The database is initialized with:
- `buddy` - Golden Retriever, PTSD service
- `luna` - Labrador Retriever, mobility service

## Verification Rules

A dog is verified if it has:
- At least one "vaccination" record with `analysis_status == "accepted"`
- AND at least one "training" or "vet_visit" record with `analysis_status == "accepted"`

