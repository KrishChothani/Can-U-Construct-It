import pickle

# Load the model from the .pkl file
with open(r'C:\Users\Het Ashishbhai Modi\Desktop\NASAAA\my-project\project\NASAAA\Backend\models\EarthQuack.pkl', 'rb') as file:
    model = pickle.load(file)


def predict_earthquake(latitude, longitude):
    prediction = model.predict([[latitude, longitude]])
    depth = prediction[0][0]
    magnitude = prediction[0][1]
    max = 7 
    min  = 1.5
    seismic_activity  = (magnitude-min)/(max-min)
    return depth, magnitude , seismic_activity
# predicted_depth, predicted_magnitude, seismic_activity = predict_earthquake(latitude, longitude)
# print(f'Predicted Depth: {predicted_depth}, Predicted Magnitude: {predicted_magnitude}')