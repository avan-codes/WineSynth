import joblib 
from joblib import load
from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import Annotated, List
import numpy as np

#data validation class 
class Data(BaseModel):
    input_data : Annotated[List[float], Field(..., description='Enter here you input data into as a list sequence => ["fixed acidity", "volatile acidity", "citric acid", "residual sugar", "chloride", "free sulfur dioxide", "total sulfur dioxide", "density", "pH", "sulphate", "alcohol"]') ]

app = FastAPI()

#home page
@app.get("/")
def home():
    return {"msg":"This is an API build for predicting wine quality"}


#predict endpoint
@app.post("/predict")
def predict(input_vals:Data) :
    try:
        input_vals = input_vals.model_dump().values()
        input_vals = list(input_vals)

        #loading prediction model
        model = joblib.load(r"C:\Users\pranj\Desktop\Tech\Github\WineSynth\backend\API\models\model.pkl")

        #loading scaler model
        scaler = load(r"C:\Users\pranj\Desktop\Tech\Github\WineSynth\backend\API\models\scaler.pkl")
        
        #input values
        input_vals = np.array(input_vals)
        print(input_vals)

        #scaling
        scaler.transform(input_vals)

        #prediction
        pred = model.predict(input_vals)
        if pred == 1:
            data = "Good"
        else :
            data = "Bad"
        return {"prediction":data}
    
    except Exception as e:
        return {"prediction":f"Error occured {e}"}


