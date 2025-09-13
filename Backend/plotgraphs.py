import matplotlib.pyplot as plt
import io

def plot_material_waste():
    print("Plotting called")
    materials = ['Concrete', 'Steel', 'Wood', 'Brick', 'Glass']
    material_waste = [200 * 0.1, 15000 * 0.05, 12000 * 0.08, 7000 * 0.07, 7500 * 0.15]

    img_buffer = io.BytesIO()

    plt.figure(figsize=(8, 6))  # Adjust the figure size if needed
    plt.bar(materials, material_waste, color=['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0'])

    # Adding titles and labels
    plt.title("Material Waste per Floor", fontsize=16)
    plt.ylabel("Waste (kg)", fontsize=12)
    plt.xlabel("Materials", fontsize=12)

    # Save the plot to the BytesIO object
    plt.savefig(img_buffer, format='png', dpi=300)
    plt.show()
    plt.close()  # Close the plot to free memory

    img_buffer.seek(0)

    # Save the image from the buffer to a file on the local system
    with open("material_waste_plot.png", "wb") as f:
        f.write(img_buffer.getvalue())

    print("Image saved successfully to 'material_waste_plot.png'")
    
    return img_buffer

if __name__ == "__main__":
    image_variable = plot_material_waste()
