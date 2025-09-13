import math
import requests
from PIL import Image, ImageDraw
from io import BytesIO

def lat_lon_to_tile(lat, lon, zoom):
    n = 2 ** zoom
    
    # Calculate the x and y tile numbers
    x = int(n * ((lon + 180) / 360))
    y = int(n * (1 - (math.log(math.tan(math.radians(lat)) + (1 / math.cos(math.radians(lat)))) / math.pi)) / 2)
    
    return x, y

def get_arcgis_tile(lat, lon, zoom=18, resize_factor=2):
    # Convert latitude and longitude to tile coordinates
    x, y = lat_lon_to_tile(lat, lon, zoom)
    
    # ArcGIS World Imagery URL
    url = f"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{zoom}/{y}/{x}"
    
    # Fetch the tile image
    response = requests.get(url)
    
    if response.status_code == 200:
        # Load the image
        image = Image.open(BytesIO(response.content))
        
        # Resize the image
        new_size = (image.width * resize_factor, image.height * resize_factor)
        image = image.resize(new_size, Image.LANCZOS)  # Use LANCZOS instead of ANTIALIAS
        
        return image
    else:
        print("Error fetching the tile image")
        return None

def mark_location_on_image(image, lat, lon, zoom):
    # Calculate the tile coordinates
    x, y = lat_lon_to_tile(lat, lon, zoom)
    
    # Calculate the pixel coordinates within the tile
    n = 2 ** zoom
    pixel_x = (lon + 180) / 360 * 256
    pixel_y = (1 - (math.log(math.tan(math.radians(lat)) + (1 / math.cos(math.radians(lat)))) / math.pi)) / 2 * 256

    # Create a draw object
    draw = ImageDraw.Draw(image)

    # Draw a red circle marker at the pixel coordinates
    marker_radius = 10  # Radius of the marker
    draw.ellipse((pixel_x - marker_radius, pixel_y - marker_radius, pixel_x + marker_radius, pixel_y + marker_radius), fill='red')

    return image

def generate_marked_image(latitude, longitude, zoom_level=18, resize_factor=4):
    # Get the tile image
    tile_image = get_arcgis_tile(latitude, longitude, zoom_level, resize_factor)

    if tile_image:
        # Mark the location on the image
        marked_image = mark_location_on_image(tile_image, latitude, longitude, zoom_level)
        return marked_image
    else:
        print("Failed to generate marked image.")
        return None

# Example usage
if __name__ == "__main__" : 
    latitude = 23.016849  # Example latitude
    longitude = 72.47732  # Example longitude
    marked_image = generate_marked_image(latitude, longitude)
    if marked_image:
        # Save the marked image
        marked_image.save("marked_location_tile.png")
        print("Marked tile image saved as 'marked_location_tile.png'")
        
        # Show the image
        marked_image.show()