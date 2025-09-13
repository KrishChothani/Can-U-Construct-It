def calculate_sustainability_score(air_quality, temperature, humidity, soil_type, flood_risk, seismic_activity, wind_patterns):
    # Assign weights to each feature
        weights = {
            'Air quality': 0.25,
            'temperature':   0.15,
            'humidity': 0.10,
            'flood risk': 0.15,
            'seismic activity': 0.10,
            'wind patterns': 0.15
        }

        # Normalize each feature to 0-100
        air_quality_score = (500 - air_quality) / 500 * 100  # AQI: lower is better
        temperature_score = (50 - temperature) / (50 - (-30)) * 100  # Temp: moderate is good
        humidity_score = ( 100 - abs(humidity - 50)) / 100 * 100  # Humidity: 50 is ideal
        flood_risk_score = (1 - flood_risk) * 100  # Lower flood risk is better
        seismic_activity_score = (1 - seismic_activity) * 100  # Lower seismic risk is better
        wind_patterns_score = min(max((wind_patterns - 3) / (10 - 3), 0), 1) * 100  # Moderate wind is good

        # Mapping for soil types
        soil_type_mapping = {
            'peat': 85,
            'silt': 80,
            'sandy': 50,
            'clay': 70,
            'loam': 100
        }
        soil_type_score = soil_type_mapping.get(soil_type, 50)  # Assign score for soil type, default to 50 if unknown

        # Calculate weighted sustainability score
        sustainability_score = (
            weights['Air quality'] * air_quality_score +
            weights['temperature'] * temperature_score +
            weights['humidity'] * humidity_score +
            weights['flood risk'] * flood_risk_score +
            weights['seismic activity'] * seismic_activity_score +
            weights['wind patterns'] * wind_patterns_score +
            0.10 * soil_type_score  # Weight for soil type
        )

        return sustainability_score

if __name__ == "__main__" : 
    # Example usage:
    ess = calculate_sustainability_score(
        air_quality=40,         # AQI
        temperature=25,         # °C
        humidity=60,            # %
        soil_type='loam',       # Soil type
        flood_risk=0.1,         # Flood risk (0-1)
        seismic_activity=0.2,   # Seismic activity (0-1)
        wind_patterns=7         # Wind speed (m/s)
    )

    print(f"Environment Sustainability Score: {ess}")