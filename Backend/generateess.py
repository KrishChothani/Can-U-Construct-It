from fpdf import FPDF
import google.generativeai as generative_ai
from ess import calculate_sustainability_score

API_KEY = 'AIzaSyCCiKT6_gfxzXNEiYO3VeE_sY15h3pSf9Y'

# Function to generate content via Gemini API
def ai(query):
    generative_ai.configure(api_key=API_KEY)
    model = generative_ai.GenerativeModel('gemini-pro')
    response = model.generate_content(query)
    cleaned_response = response.text.replace('*', '').replace('#', '')
    return cleaned_response

# Function to generate sustainability report based on given data
def generate_report_with_gemini(data):
    prompt = f"""
    Generate a detailed environmental sustainability report based on the following data:
    
    ### Environmental Data:
    - Location : "AhemedaBad , Nirma University"
    - Air Quality Index: {data['air_quality']} (lower is better)
    - Temperature: {data['temperature']}°C (ideal range is between -30°C and 50°C)
    - Humidity: {data['humidity']}% (ideal value is 50%)
    - Soil Type: {data['soil_type']} (e.g., loam, clay, peat, etc.)
    - Flood Risk: {data['flood_risk']} (0-1 scale, where 0 indicates no flood risk and 1 indicates very high risk)
    - Seismic Activity: {data['seismic_activity']} (0-1 scale, where 0 indicates low seismic activity and 1 indicates high activity)
    - Wind Patterns: {data['wind_patterns']} m/s (moderate wind speeds between 3 and 10 m/s are ideal)

    ### Environmental Sustainability Score (ESS):
    The ESS is a composite score that evaluates the overall environmental sustainability of a given area based on several critical factors:
    - *Air Quality* (Weight: 25%): The air quality index (AQI) is normalized on a scale where lower AQI values result in a higher score, as better air quality contributes significantly to sustainability.
    - *Temperature* (Weight: 15%): Temperatures closer to moderate values (within the range of -30°C to 50°C) yield better scores, as extreme temperatures may pose environmental stress.
    - *Humidity* (Weight: 10%): Humidity levels close to 50% are considered ideal for environmental sustainability, providing balance between dryness and moisture.
    - *Flood Risk* (Weight: 15%): Lower flood risk improves sustainability scores since areas with lower flood risk are more resilient to climate impacts.
    - *Seismic Activity* (Weight: 10%): Lower seismic activity indicates lower risks of natural disasters, thus leading to higher sustainability.
    - *Wind Patterns* (Weight: 15%): Moderate wind speeds (between 3 and 10 m/s) contribute positively, as they are associated with stable weather conditions.
    - *Soil Type* (Weight: 10%): Soil types such as loam, which support strong agricultural productivity, receive higher scores.

    The final ESS for this location is *{data['ess_score']}*, which indicates the overall environmental resilience and sustainability of the area. 

    ### Task for Gemini:
    Based on this ESS and the environmental factors above, generate a comprehensive report detailing the environmental sustainability of this area. Highlight key strengths and weaknesses in the environmental conditions, and provide actionable recommendations for improving the sustainability score. Discuss how each of the above factors contributes to the score and suggest ways to mitigate risks (such as improving air quality, managing flood risk, etc.) to enhance the sustainability of this region.

    The report should also explain what the ESS represents in terms of long-term environmental stability, resilience to climate change, and the potential for sustainable development in the area.
    """
    reportText = ai(prompt)
    return reportText

# Function to create a PDF with table and report
def create_pdf_with_table(report_text, data, image_filename, file_name='Environmental_Sustainability_Report.pdf'):
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()

    # Title
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(200, 10, txt="Environmental Sustainability Report", ln=True, align='C')

    # Subtitle
    pdf.set_font('Arial', 'I', 12)
    pdf.cell(200, 10, txt="Generated Report for Ahmedabad, Nirma University", ln=True, align='C')

    pdf.ln(10)

    # Add the image to the PDF
    pdf.image(image_filename, x=10, y=30, w=190)  # Adjust x, y, and w as necessary

    # Add vertical space after the image
    pdf.ln(200)  # Adjust the value as needed to ensure there's enough space for the text

    # Table Header
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(40, 10, 'Factor', 1)
    pdf.cell(40, 10, 'Value', 1)
    pdf.cell(40, 10, 'Score', 1)
    pdf.cell(70, 10, 'Explanation', 1)
    pdf.ln()

    # Data rows for table
    pdf.set_font('Arial', '', 12)
    factors = [
        ('Air Quality Index (AQI)', data['air_quality'], '8.33', 'Low pollution, good for sustainability'),
        ('Temperature', f"{data['temperature']}°C", '10', 'Ideal temperature range'),
        ('Humidity', f"{data['humidity']}%", '7', 'Slightly elevated'),
        ('Soil Type', data['soil_type'], '10', 'Loam is ideal for agriculture'),
        ('Flood Risk', data['flood_risk'], '9', 'Low flood risk'),
        ('Seismic Activity', data['seismic_activity'], '8', 'Moderate risk, manageable'),
        ('Wind Patterns', f"{data['wind_patterns']} m/s", '9', 'Moderate wind speeds')
    ]

    # Add each row
    for factor, value, score, explanation in factors:
        pdf.cell(40, 10, factor, 1)
        pdf.cell(40, 10, str(value), 1)
        pdf.cell(40, 10, score, 1)
        pdf.cell(70, 10, explanation, 1)
        pdf.ln()

    # Line break before report
    pdf.ln(10)

    # Report section
    pdf.set_font('Arial', '', 12)
    pdf.multi_cell(0, 10, report_text)

    # Save the PDF
    pdf.output(file_name)
    return file_name

if __name__ == "__main__":
    # Example data
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
        "soil_type": "loam",
        "flood_risk": 0.1,
        "seismic_activity": 0.2,
        "wind_patterns": 7,
        "ess_score": ess
    }

    # Generate the report using the Gemini API
    report = generate_report_with_gemini(report_data)
    
    # Create PDF from the generated report text
    create_pdf_with_table(report, report_data)