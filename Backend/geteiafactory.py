from fpdf import FPDF
import google.generativeai as generative_ai
from ess import calculate_sustainability_score
from generateess import generate_report_with_gemini
from genFactoryReport import create_pdf_from_reportEIAFactory
API_KEY = 'AIzaSyCCiKT6_gfxzXNEiYO3VeE_sY15h3pSf9Y'
from plotgraphs import plot_material_waste

# Function to generate content via Gemini API
def ai(query):
    generative_ai.configure(api_key=API_KEY)
    model = generative_ai.GenerativeModel('gemini-pro')
    response = model.generate_content(query)
    cleaned_response = response.text.replace('*', '').replace('#', '')
    return cleaned_response

# Function to generate sustainability report based on given data
def generate_report_with_gemini1(reportOFESS):
    prompt = f"""
        ### Construction Project Details:
        - Floors Above Ground: "10"
        - Floors Below Ground: "2"
        - Base Depth: "4 meters"
        - Product Type: "Textile Manufacturing Facility"
        - Overall Environmental Impact of the Project: "High"
        - PM10 Emissions: "40 kg per year"
        - Foundation Volume: "3000 cubic meters"
        - Primary Fuel Source: "Coal (for production processes)"
        - Total Emissions: "27378 kg (CO2 equivalent)"
        - Material Waste Per Floor: "Concrete: 200 kg, Steel: 15000 kg, Wood: 12000 kg, Brick: 7000 kg, Glass: 7500 kg"
        - Environmental Impact Category: "Water pollution, solid waste from scraps and production residues"
        
        ### Environmental Sustainability Report for the Project Site:
        {reportOFESS}
        
        ### Context for Analysis:
        This construction project involves a textile production facility with significant emissions and material waste, potentially impacting the surrounding environment. The construction and operational phases will involve heavy use of resources, produce waste, and contribute to air and water pollution. Additionally, energy-intensive processes (such as coal usage) raise concerns about long-term sustainability, especially in light of global and local environmental goals.
        
        ### Objectives:
        1. *Evaluate Environmental Impact*: Assess the short-term and long-term environmental effects of this construction project, considering its proximity to the local environment, air quality, water bodies, and community.
        2. *Risk and Mitigation Analysis*: Identify key risks posed by the construction and operational phases, such as pollution, resource depletion, and waste management. Provide specific mitigation strategies to minimize these risks, including sustainable materials and practices.
        3. *Impact on Local Sustainability*: Examine how this project might affect the surrounding area’s ability to maintain environmental sustainability (e.g., through increased air pollution, water contamination, resource depletion, and waste generation). How does it align with the current ESS score of the area?
        4. *Recommendations for Sustainable Development*: Suggest actionable recommendations to reduce the overall environmental impact of the project while maintaining its economic feasibility. Highlight areas for improvement, such as adopting cleaner fuel alternatives, optimizing waste management, and enhancing energy efficiency.
        5. *Long-Term Environmental Resilience*: Predict the project’s long-term impact on climate resilience, resource availability, and the community’s quality of life. Suggest how this project can transition toward net-zero emissions or integrate circular economy principles in its operations.
        
        ### Questions to Address:
        - *Air Quality and Emissions*: How will the construction and operation of this project affect the air quality (considering the emissions of PM10 and other pollutants)? What measures can be implemented to minimize emissions and air pollution?
        - *Water and Soil Impact*: How will the project affect local water bodies and soil health, particularly in terms of water pollution and soil contamination? What wastewater treatment and soil management practices can mitigate these effects?
        - *Material Waste*: What strategies can be implemented to handle the material waste generated per floor during construction? Are there opportunities for recycling or reusing materials like concrete, steel, wood, and glass to reduce waste?
        - *Energy Efficiency and Renewable Energy*: How can the project improve energy efficiency during construction and operation? Are there feasible renewable energy sources that can replace or supplement coal use to reduce carbon emissions?
        - *Sustainability Certifications and Best Practices*: What certifications (e.g., LEED, BREEAM) or best practices can be pursued to ensure that the project meets high standards of environmental sustainability?
        
        ### Final Goal:
        Provide a comprehensive, detailed analysis with prioritized suggestions that balance both economic feasibility and environmental responsibility. The goal is to ensure that this project not only minimizes harm to the environment but also contributes positively to the long-term sustainability of the region.
        """

    reportText = ai(prompt)
    return reportText

if __name__ == "__main__" : 
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
    relatedreport = generate_report_with_gemini1(reportOfEss)
    print(relatedreport)
    image_buffer = plot_material_waste()
    create_pdf_from_reportEIAFactory(relatedreport,image_file_path=r'C:\Users\raj\Desktop\NasaHack\reactwork\material_waste_per_floor.png')