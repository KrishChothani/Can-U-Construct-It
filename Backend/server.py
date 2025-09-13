# app.py
import ee
import json
from flask import Flask, request, jsonify, send_file
from flask_cors import cross_origin, CORS
from earthquackmodel import predict_earthquake
from floodmodel import predict_flood_occurred
from ess import calculate_sustainability_score
import requests
from generateess import generate_report_with_gemini ,  create_pdf_with_table
from imageGenerate import generate_marked_image
from geteiafactory import generate_report_with_gemini1
from genFactoryReport import create_pdf_from_reportEIAFactory

app = Flask(__name__)
CORS(app)

projectid = 'ee-jays7'

# Initialize Earth Engine API
ee.Initialize(project=projectid)

# Load Hansen Global Forest Change dataset
forest_dataset = ee.Image("UMD/hansen/global_forest_change_2023_v1_11")

# Function to count trees in a polygon
def count_trees(polygon_coords):
    # Convert coordinates to Earth Engine polygon geometry
    polygon = ee.Geometry.Polygon(polygon_coords)

    # Tree cover (forest) is classified where 'treecover2000' > 0 (meaning any tree cover)
    tree_cover = forest_dataset.select(['treecover2000']).gt(1)  # Lower threshold to include more tree cover

    # Get total area of tree cover within the polygon (in square meters)
    forest_area = tree_cover.multiply(ee.Image.pixelArea()).reduceRegion(
        reducer=ee.Reducer.sum(),
        geometry=polygon,
        scale=30,  # 30m per pixel scale (same as the resolution of the dataset)
        maxPixels=1e9
    )

    # Get tree cover info (debugging/logging)
    print("Forest area info:", forest_area.getInfo())

    # Check if 'treecover2000' key exists in the forest_area (it might be missing in areas with no trees)
    forest_area_value = forest_area.get('treecover2000')
    if forest_area_value is None:
        return 0  # No tree cover in the area

    # Convert forest area from square meters to hectares (1 hectare = 10,000 square meters)
    forest_area_hectares = forest_area_value.getInfo() / 10000

    # Estimate the number of trees based on an average density (e.g., 200 trees per hectare)
    tree_density_per_hectare = 200  # Adjust this based on the type of forest or region
    estimated_tree_count = forest_area_hectares * tree_density_per_hectare

    return estimated_tree_count

# API endpoint to receive coordinates and count trees
# @app.route('/count-trees', methods=['POST'])
@app.route('/count-trees', methods=['POST'])
@cross_origin()
def count_trees_in_area():
    data = request.get_json()

    # Get the polygon coordinates from the frontend
    polygon_coords = data['coordinates']

    # Count trees in the provided polygon
    estimated_tree_count = count_trees(polygon_coords)

    return jsonify({'estimated_tree_count': estimated_tree_count})


@app.route("/getQuackReport", methods=["POST"])
@cross_origin()
def get_earth_quackeReport():
    try:
        # Get JSON data from the request
        data = request.get_json()
        latitude = data.get('Latitude')
        longitude = data.get('Longitude')

        print("Received Latitude:", latitude)
        print("Received Longitude:", longitude)
        Depth , Magnitude  , Seismic_Activity = predict_earthquake(latitude,longitude)
        print(Depth, Magnitude, Seismic_Activity)
        # Process the data (this is where you would implement your logic)
        return jsonify({"status": "success", "Depth": Depth, "Magnitude": Magnitude , "Seismic_Activity" : Seismic_Activity}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"status": "error", "message": str(e)}), 500
    
@app.route('/FloodReport',methods = ["POST"])
@cross_origin()
def get_flood_quackeReport():
    try :
        print("yes")
        data = request.get_json()
        print(data)
        input_data = {
            'Latitude': data['Latitude'],
            'Longitude': data['Longitude'],
            'Rainfall (mm)': data['Rainfall'],
            'Temperature (°C)': data['Temperature'],
            'Humidity (%)': data['Humidity'],
            'River Discharge (m³/s)': data['RiverDischarge'],
            'Water Level (m)': data['WaterLevel'],
            'Elevation (m)': data['Elevation'],
            'Land Cover': data['LandCover'],
            'Soil Type': data['SoilType'],
            'Population Density': data['PopulationDensity'],
            'Infrastructure': data['Infrastructure'],
            'Historical Floods': data['HistoricalFloods']
        }
        predict_flood = predict_flood_occurred(input_data)
        print(predict_flood)
        return jsonify({"Flood Will Ocuur Or Not" : f"{predict_flood}"}),200
    except Exception as e:
        print("Error:", e)
        return jsonify({"status": "error", "message": str(e)}), 500
    


@app.route("/score", methods=["POST"]) 
@cross_origin()
def score():
    try:
        print("WOEKJN")
        data = request.get_json()
        ess = calculate_sustainability_score(
            air_quality=data['air_quality'],
            temperature=data['temperature'],
            humidity=data['humidity'],
            soil_type=data['soil_type'],
            flood_risk=int(data['flood_risk']),
            seismic_activity=data['seismic_activity'],
            wind_patterns=data['wind_patterns']
        )
        
        # Assuming 'ess' is a number or a serializable type, return it as JSON
        return jsonify({"ess_score": ess})
    except Exception as e:
        print(e)





@app.route("/getEssScore", methods=["POST"]) 
@cross_origin()
def getEssScore() : 
    try :
        print("yes Score Is called") 
        data = request.get_json()
        print(data)
        ess = calculate_sustainability_score(
            air_quality=data['air_quality'],
            temperature=data['temperature'],
            humidity=data['humidity'],
            soil_type=data['soil_type'],
            flood_risk=int(data['flood_risk']),
            seismic_activity=data['seismic_activity'],
            wind_patterns=data['wind_patterns']
        )

        print(ess)
        report_data = {
            "air_quality": data['air_quality'],
            "temperature": data['temperature'],
            "humidity": data['humidity'],
            "soil_type": data['soil_type'],
            "flood_risk": data['flood_risk'],
            "seismic_activity": data['seismic_activity'],
            "wind_patterns": data['wind_patterns'],
            "ess_score": ess
        }
        # latitude = 23.016849
        # longitude = 72.47732
        # marked_image = generate_marked_image(latitude,longitude)
        # report = generate_report_with_gemini(report_data)

        # pdf_filename = create_pdf_with_table(report, report_data)

        # return send_file(pdf_filename, as_attachment=True)
        latitude = data['lat']
        longitude = data['lon']
        
        # Generate marked image
        print("yes Score Is called 2") 
        marked_image = generate_marked_image(latitude, longitude)
        image_filename = "marked_location_tile.png"
        if marked_image:
            marked_image.save(image_filename)

        print("yes Score Is called 3") 
        # Generate report
        report = generate_report_with_gemini(report_data)

        # Create PDF with image
        pdf_filename = create_pdf_with_table(report, report_data, image_filename)

        return send_file(pdf_filename, as_attachment=True)
    except : 
        print("YeS score is not called")

@app.route("/getFactoryReport",methods=["POST"])
@cross_origin()
def getFactoryReport(): 
    try :
        data = request.get_json()
        print(data) 
        print("api called")
        ess = calculate_sustainability_score(
        air_quality=40,         # AQI
        temperature=25,         # °C
        humidity=60,            # %
        soil_type='loam',       # Soil type
        flood_risk=0.1,         # Flood risk (0-1)
        seismic_activity=0.2,   # Seismic activity (0-1)
        wind_patterns=7         # Wind speed (m/s)
        )
        report_data = {
            "air_quality": 40,
            "temperature": 25,
            "humidity": 60,
            "soil_type": 'loam',
            "flood_risk": 0.1,
            "seismic_activity": 0.2,
            "wind_patterns": 7,
            "ess_score": ess
        }
        reportOfEss = generate_report_with_gemini(report_data)
        print(reportOfEss)
        relatedReport = generate_report_with_gemini1(reportOfEss)
        print(relatedReport)
        reportFile = create_pdf_from_reportEIAFactory(relatedReport,image_file_path=r'C:\Users\Het Ashishbhai Modi\Desktop\NASAAA\my-project\project\NASAAA\Backend\material_waste_plot.png')
        return send_file(reportFile,as_attachment=True)
    except Exception as e:
        print("Error:", e)
        return jsonify({"status": "error", "message": str(e)}), 500
# def getEssScore():
#     try:
#         print("yesdjgdhfhdtfth")
#         data = request.get_json()
#         print(data)
#         ess = calculate_sustainability_score(
#             air_quality=data['air_quality'],
#             temperature=data['temperature'],
#             humidity=data['humidity'],
#             soil_type=data['soil_type'],
#             flood_risk=int(data['flood_risk']),
#             seismic_activity=data['seismic_activity'],
#             wind_patterns=data['wind_patterns']
#         )
#         report_data = {
#             "air_quality": data['air_quality'],
#             "temperature": data['temperature'],
#             "humidity": data['humidity'],
#             "soil_type": data['soil_type'],
#             "flood_risk":int(data['flood_risk']),
#             "seismic_activity": data['seismic_activity'],
#             "wind_patterns": data['wind_patterns'],
#             "ess_score": ess
#         }
#         report = generate_report_with_gemini(report_data)
#         pdf_filename = create_pdf_with_table(report, report_data)

#         # Return the generated PDF as an attachment
#         return send_file(pdf_filename, as_attachment=True)
    
#     except Exception as e:
#         print("Error generating ESS report:", e)
#         return jsonify({"status": "error", "message": str(e)}), 500




@app.route('/count-buildings', methods=['POST'])
@cross_origin()
def count_buildings():
    data = request.get_json()
    coordinates = data['coordinates']
    
    overpass_url = "http://overpass-api.de/api/interpreter"
    overpass_query = f"""
    [out:json];
    (
      way["building"](poly:"{' '.join([f'{lat} {lon}' for lon, lat in coordinates])}");
      relation["building"](poly:"{' '.join([f'{lat} {lon}' for lon, lat in coordinates])}");
    );
    out body;
    """
    
    try:
        response = requests.get(overpass_url, params={'data': overpass_query})
        response.raise_for_status()
        data = response.json()
        
        building_count = len(data.get('elements', []))
        return jsonify({'building_count': building_count})
    
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Failed to fetch building data: {str(e)}'}), 500

if __name__ == "__main__":
    app.run(debug=True,port=5000,host='0.0.0.0')