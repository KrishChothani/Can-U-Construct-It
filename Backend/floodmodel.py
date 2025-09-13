import pandas as pd
import pickle

# Load your model and prepare training columns
with open(r'C:\Users\Het Ashishbhai Modi\Desktop\NASAAA\my-project\project\NASAAA\Backend\models\FloodModel.pkl', 'rb') as file:
    model = pickle.load(file)

# Load the dataset and preprocess to get training columns
df = pd.read_csv(r"C:\Users\Het Ashishbhai Modi\Desktop\NASAAA\my-project\project\NASAAA\Backend\dataset\flood_risk_dataset_india.csv")
X = df.drop('Flood Occurred', axis=1)
X = pd.get_dummies(X, drop_first=True)
training_columns = X.columns.tolist()  # Save columns after one-hot encoding

# Define the prediction function
def predict_flood_occurred(input_data):
    """
    Predicts whether a flood occurred given input features.

    Parameters:
    - input_data: A dictionary containing feature names and their corresponding values.

    Returns:
    - Prediction (0 or 1) whether a flood occurred.
    """
    # Create a DataFrame from the input data
    input_df = pd.DataFrame([input_data])

    # Apply one-hot encoding and reindex
    input_df = pd.get_dummies(input_df, drop_first=True)
    input_df = input_df.reindex(columns=training_columns, fill_value=0)

    # Make a prediction
    prediction = model.predict(input_df)

    return prediction[0]