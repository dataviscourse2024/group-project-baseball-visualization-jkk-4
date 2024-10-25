from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

from fastapi.staticfiles import StaticFiles

app = FastAPI()

origins = [
    "http://localhost:8080",
    "http://localhost:8000" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to our baseball API."}

@app.get("/franchises")
async def franchises():
    data = pd.read_csv("./datasets/csv/TeamsFranchises.csv")
    data = data[["franchID", "franchName"]]
    return data.to_dict(orient='records')

@app.get("/franchise/{franchise_id}")
async def franchises(franchise_id: str):
    data = pd.read_csv("./datasets/csv/Teams.csv")
    data = data.loc[data["franchID"] == franchise_id]
    data = data[["yearID", "G", "W", "L"]]
    return data.to_dict(orient='records')


app.mount("/datasets", StaticFiles(directory="datasets"), name="datasets")