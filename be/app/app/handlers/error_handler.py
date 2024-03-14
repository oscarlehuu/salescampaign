from fastapi.exceptions import RequestValidationError
from fastapi.responses import PlainTextResponse
from app.main import app


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return PlainTextResponse(str(exc), status_code=400)
