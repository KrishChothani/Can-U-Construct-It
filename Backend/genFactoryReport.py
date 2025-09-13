from fpdf import FPDF

def create_pdf_from_reportEIAFactory(gemini_output, image_file_path, file_name="Construction_and_ESS_Report.pdf"):
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()

    # Title
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(200, 8, txt="Environmental Sustainability and Construction Impact Report", ln=True, align='C')
    pdf.ln(4)  

    # Introduction
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(200, 6, txt="Introduction", ln=True)
    pdf.set_font("Arial", '', 12)
    pdf.multi_cell(0, 6, txt="This report analyzes the environmental impact of the given construction project "
                             "in light of the existing environmental conditions and sustainability metrics. "
                             "The following sections detail the construction details, environmental sustainability report, "
                             "and recommendations from Gemini for mitigating the effects and improving sustainability.")
    pdf.ln(3)  

    # Entire Report
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(200, 6, txt="Full Report", ln=True)
    pdf.set_font("Arial", '', 12)
    pdf.multi_cell(0, 6, txt=gemini_output) 

    # Conclusion
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(200, 6, txt="Conclusion", ln=True)
    pdf.set_font("Arial", '', 12)
    pdf.multi_cell(0, 6, txt="The construction project has a significant impact on the environment. Based on the analysis "
                             "and recommendations provided, adopting sustainable practices and mitigation strategies can "
                             "help minimize negative effects and contribute to long-term environmental resilience.")
    
    # Add the image to the PDF
    pdf.image(image_file_path, x=10, w=190)  # Adjust x and w as needed for layout

    # Save the PDF
    pdf.output(file_name)
    print(f"PDF report saved as {file_name}")
    return file_name