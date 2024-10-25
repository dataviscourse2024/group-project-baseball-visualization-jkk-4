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

@app.get("/players")
async def players():
    personalInfo = pd.read_csv("./datasets/csv/People.csv",  encoding='latin-1')
    print(personalInfo)
    personalInfo = personalInfo.loc[personalInfo["birthYear"] > 1800]
    personalInfo = personalInfo[["playerID", "nameFirst", "nameLast"]]
    return personalInfo.to_dict(orient='records')

@app.get("/players/{player_id}")
async def batters(player_id: str):
    data = pd.read_csv("./datasets/csv/Batting.csv")
    data = data.loc[data["playerID"] == player_id]
    if len(data) > 0:
        data = data[["playerID", "yearID", "teamID","G","AB","R","H","2B","3B","HR","RBI","SB","CS","BB","SO","IBB","HBP","SH","SF","GIDP"]].fillna(0)
    else:
        data = pd.read_csv("./datasets/csv/Pitching.csv")
        data = data.loc[data["playerID"] == player_id]
        data = data[["playerID","yearID", "teamID", "W","L","G","GS","CG","SHO","SV","IPouts","H","ER","HR","BB","SO","BAOpp","ERA","IBB","WP","HBP","BK","BFP","GF","R","SH","SF","GIDP"]].fillna(0)
    return data.to_dict(orient='records')
