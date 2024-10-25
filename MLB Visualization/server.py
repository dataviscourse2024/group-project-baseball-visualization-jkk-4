from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

origins = [
    "http://localhost:8080",
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

@app.get("/batting/{player_id}")
async def batting(player_id: str):
    data = pd.read_csv("./datasets/csv/Batting.csv")
    data = data.loc[data["playerID"] == player_id]
    data = data[["yearID", "AB", "H", "2B", "3B", "HR", "BB", "IBB", "HBP", "SF"]]
    data.fillna(0, inplace=True)
    return data.to_dict(orient='records')