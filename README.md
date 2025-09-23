## Introduction
Our website focuses on environmental sustainability by using a map-based interface to collect user input. It allows users to analyze the environmental conditions of a selected area through an *Environmental Sustainability Score (ESS)* system. The system factors in:

- Air Quality
- Pollution Levels
- Humidity
- Number of Trees
- Temperature
- Wind Speed
- Soil Type
- Number of Buildings

### New Key Features
- **Interactive Map Interface:** Users select a location to analyze its environmental conditions and visualize the impact of different types of constructions on the map.
- **Environmental Sustainability Score:** Using AI models, it calculates the environmental sustainability score for different building types and construction stages (Before, During, and After).
- **Comprehensive Environmental Analysis Report:** Includes calculations of AQI changes, earthquake resistance requirements, flood risks, tree cut/replant ratios, and emissions from various activities.

## Environmental Sustainability Score (ESS)
The ESS report generates a score between *0 and 100*, which represents the sustainability of the construction.

- *Low Scores* trigger the need for *remedies* to mitigate environmental impacts.
- Recommendations include methods to improve *air quality*, reduce *pollution*, and more.

### Input Forms
The data collection forms allow users to enter detailed information for each building type. Example inputs include:
- **Factory:** Floors, Depth, Fuel, Product
- **Flat:** Floors, Depth, Number of Apartments
- **Tenement:** Floors, Depth, Number of Vehicles
- **Commercial Building:** Floors, Depth (Parking), Number of Stores, Number of Vehicles

### Output Factors:
The system evaluates a range of environmental metrics, including:
- **AQI:** Minimum, Maximum (during construction), and Net Change after construction
- **Earthquake Resistance:** Depth required to make the building resistant, based on magnitude and probability
- **Flood Risk:** Probability and risks from nearby water resources
- **Tree Impact:** Number of trees to be cut and replanting ratio (1:15, where 1 tree cut = 15 saplings)
- **Emissions:** Estimates for PM10, CO2, and other pollutants based on construction activities and fuel types

## Final Report and Mitigation Measures
The final report outlines:
- *Environmental Aspects* affected by construction, with specific insights for each building type.
  - [Environmental Analysis Report](https://github.com/Jay-1409/Storage/blob/ca19018f0f0f54c1c1f5eb7a57b037a0b4e065fe/ESS_Report%20(6).pdf)
- *Mitigation Measures* to help reduce the impact.
  - [Sustainability Report](https://github.com/Jay-1409/Storage/blob/bacf1ff2bfc9526685900996c717b15b4b9fa53f/Environmental_Sustainability_Report_(12)%5B1%5D.pdf)

These measures focus on pollution reduction, air quality improvement, and other environmental considerations.

## Emission and Environmental Calculations
Here are some key formulas and calculations used to estimate the environmental impacts:

### Air Quality Index (AQI) Calculation:
\[ AQI = \left( \frac{I_{high} - I_{low}}{C_{high} - C_{low}} \right) \times (C - C_{low}) + I_{low} \]

### PM10 Emissions from Construction:
- **Normal Depth:** \( E_{PM10} = D \times A \times EF \)
- **Earthquake Depth:** \( E_{PM10} = V \times \rho \times EF \)

### Power Plant Emissions:
\[ E = Q \times FC \times EF \]

### Emissions from Different Fuel Types:
- **Coal:** \( E_{CO2, coal} = Q_{coal} \times 2200 \)
- **Diesel:** \( E_{CO2, diesel} = Q_{diesel} \times 2700 \)
- **Charcoal:** \( E_{CO2, charcoal} = Q_{charcoal} \times 3000 \)
- Other fuel types have similar formulas based on specific emission factors.

### Industry-Specific Impact Calculations:
- **Textile:** Water pollution and solid waste from scraps. \( W = Q \times EF \)
- **Electronics:** E-waste and toxic chemicals. \( W = Q \times EF \)
- **Automobile:** Air pollution and manufacturing waste. \( E = Q \times EF \)
  
These formulas provide a basic framework for estimating emissions from various pollution sources. For detailed calculations, specific parameters and emission factors are considered based on technology, location, and industry standards.

## Frontend Output
Our website generates the following output for users after data collection and ESS analysis:

- Fuel Emissions
- Impact Category
- Material Usage
- Overall Impact
- PM10 Emissions
- Total Emissions

These outputs provide a comprehensive analysis of the environmental effects of the construction and possible ways to mitigate negative impacts.

## Roadmap

- Additional browser support
- Add more integrations

## User Interaction Flow
1. **Map Selection (Leaflet):**
   - Users select a location on a map to analyze the current environmental conditions of the area.
2. **Building Type Selection:**
   - Users can choose from four types of buildings to construct, each with specific data requirements.

## AI Models and APIs:
- **Earthquake Risk:** Trained Random Forest model using [Indian Earthquakes Dataset](https://www.kaggle.com/datasets/parulpandey/indian-earthquakes-dataset2018-onwards)
- **Flood Risk:** Trained Random Forest model using [Flood Risk in India Dataset](https://www.kaggle.com/datasets/s3programmer/flood-risk-in-india)
- **Tree Counting:** [Earth Engine Dataset for Tree Cover](https://developers.google.com/earth-engine/datasets/catalog/UMD_hansen_global_forest_change_2023_v1_11)
- **Weather and Pollution:** [OpenWeatherMap API](https://api.openweathermap.org)

## Citations:

- Carbon emission factor for different fuel: [ResearchGate](https://www.researchgate.net/figure/Carbon-emission-factors-for-each-fuel-type_tbl1_329926311)
- AQI calculation: [EPA Guide](https://www.epa.gov/sites/default/files/2014-05/documents/zell-aqi.pdf)

---
