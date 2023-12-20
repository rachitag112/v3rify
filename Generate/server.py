# server.py
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi import HTTPException
import subprocess

app = FastAPI()

@app.post("/call_python_script")
async def call_python_script():
    try:
        subprocess.run(['python', 'main.py'], check=True)
        return JSONResponse(content={"message": "Python script executed successfully"}, status_code=200)
    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=500, detail=f"Error calling Python script: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
