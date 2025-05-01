# main.py

from fastapi import FastAPI, UploadFile, File
from fastapi.responses import StreamingResponse
from service.remover import BackgroundRemover
from service.utils import FileHandler
import io

app = FastAPI(title="AI Background Remover")

# Encapsulation: Object of logic class
remover = BackgroundRemover()

@app.get("/")
def root():
    return {"message": "Welcome to the AI Background Remover API"}

@app.post("/remove-bg")
async def remove_bg(file: UploadFile = File(...)):
    # Read & Validate
    image_data = await FileHandler.read_image(file)

    # Remove background
    result = remover.remove_background(image_data)

    # Return image
    return StreamingResponse(io.BytesIO(result), media_type="image/png")
