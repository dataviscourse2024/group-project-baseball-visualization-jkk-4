from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from fastapi.staticfiles import StaticFiles

app = FastAPI()

origins = [
    "https://dataviscourse2024.github.io"
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
    return {"message": "Welcome to our baseball API. Open the '/docs' page to see the API.",
            "link": "/docs"}

app.mount("/datasets", StaticFiles(directory="MLB Visualization/datasets"), name="datasets")


@app.get("/players")
async def players():
    personalInfo = pd.read_csv("MLB Visualization/datasets/csv/People.csv",  encoding='latin-1')
    personalInfo = personalInfo.loc[personalInfo["birthYear"] > 1800]
    personalInfo = personalInfo[["playerID", "nameFirst", "nameLast"]]
    return personalInfo.to_dict(orient='records')

@app.get("/batters/{player_id}")
async def batters(player_id: str):
    data = pd.read_csv("MLB Visualization/datasets/csv/Batting.csv")
    data = data.loc[data["playerID"] == player_id]
    data = data[["yearID","TeamName","G","AB","R","H","2B","3B","HR","RBI","SB","CS","BB","SO","IBB","HBP","SH","SF","GIDP"]].fillna(0)
    return data.to_dict(orient='records')

@app.get("/pitchers/{player_id}")
async def pitchers(player_id: str):
    data = pd.read_csv("MLB Visualization/datasets/csv/Pitching.csv")
    data = data.loc[data["playerID"] == player_id]
    data = data[["yearID", "TeamName", "W","L","G","GS","CG","SHO","SV","IPouts","H","ER","HR","BB","SO","BAOpp","ERA","IBB","WP","HBP","BK","BFP","GF","R","SH","SF","GIDP"]].fillna(0)
    return data.to_dict(orient='records')

