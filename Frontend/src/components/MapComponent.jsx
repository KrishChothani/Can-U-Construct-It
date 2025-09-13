  import React, { useState, useRef, useEffect } from 'react';
  import { MapContainer, TileLayer, FeatureGroup, LayersControl, WMSTileLayer } from 'react-leaflet';
  import 'leaflet/dist/leaflet.css'; // Leaflet CSS
  import { EditControl } from 'react-leaflet-draw';
  import 'leaflet-draw/dist/leaflet.draw.css'; // Leaflet Draw CSS
  import axios from 'axios';
  import leafletImage from 'leaflet-image'; // Import leaflet-image
  import BeforeConstruction from './BeforeConstruction';
  import DuringConstruction from './DuringConstruction';
  import AfterConstruction from './AfterConstruction';
  import FactoryForm from './Factoryform';
  import ConstructionCarousel from './Curosel';
  // import setErr
  import ConstructionData from './ConstructionData';


  const MapComponent = () => {
    const [treeCount, setTreeCount] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [points, setPoints] = useState([]);
    const [essScore, setEssScore] = useState(null);
    const [buildCount , setBuildingCount] = useState(null);
    const [latitude, setLatitude] = useState(null); // State for latitude
    const [longitude, setLongitude] = useState(null); 
    const [essData, setEssData] = useState({
      air_quality: null,
      temperature: null,
      humidity: null,
      soil_type: null,
      flood_risk: null,
      seismic_activity: null,
      wind_patterns: null,
    });

    const [isFactoryFormVisible, setIsFactoryFormVisible] = useState(false); // Add this line
    const toggleFactoryForm = () => {
      setIsFactoryFormVisible((prevState) => !prevState);
    };

    const [factoryData, setFactoryData] = useState({
      materialUsage: {},
      overallImpact: '',
      pm10Emission: 0,
      foundationVolume: 0,
      fuelEmissions: {},
      totalEmissions: 0,
      emissionsWeight: 0,
      impactCategory: '',
    });
    const mapInstance = useRef(null); // Store map instance reference
    // const SoilTypeFetcher = (coordinates) => {
      
        const [mostProbableSoilType, setMostProbableSoilType] = useState(null);
      //   const [error, setError] = useState(null);
    
    //   // const lat = 23.0225; // Latitude
    //   // const lon = 72.5714; // Longitude
    
    //   // useEffect(() => {
      const fetchEssScore = async () => {
        try {
          console.log("first");
          console.log(points)
          // Update essData to include latitude and longitude
          const latitude = points.length > 0 ? points[0][1] : null; // Get latitude from points
          const longitude = points.length > 0 ? points[0][0] : null; // Get longitude from points
          // console.log("first")
          // console.log(latitude)
          // console.log(longitude)
          const essDataWithCoordinates = {
            ...essData,
            lat: latitude,
            lon: longitude,
          };
          console.log(essDataWithCoordinates);
      
          // Perform the POST request using fetch
          const response = await fetch('http://localhost:5000/score', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(essDataWithCoordinates),
          });
      
          // Check if the response status is OK
          if (!response.ok) {
            throw new Error('Failed to fetch ESS score');
          }
      
          // Assuming the backend returns the score as JSON
          const essScore = await response.json(); // Convert the response to JSON
          console.log('ESS Score:', essScore);
      
          // Use the ESS score in the UI
          setEssScore(essScore.ess_score);
      
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const fetchSoilData = async (coordinates) => {
          try {
          const [longitude, latitude] = coordinates[0];
            const response = await axios.get(
              `https://api.allorigins.win/get?url=${encodeURIComponent(
                `https://api-test.openepi.io/soil/type?lat=${latitude}&lon=${longitude}`
              )}`
            );
    
            const data = JSON.parse(response.data.contents);
            if (data && data.properties) {
              const soilData = data.properties;
              setMostProbableSoilType(soilData.most_probable_soil_type);
            } else {
              setError("Unexpected response structure");
            }
          } catch (err) { 
            // setError("Error fetching soil data");
            console.error(err);
          }
        };
    
        // fetchSoilData();
      // }, [lat, lon]);
    
    
    // Fetch ESS Report
    const sendPolygonToBackendForBuildings = async (coordinates) => {
      try {
        const response = await fetch("http://localhost:5000/count-buildings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ coordinates }),
        });
        const data = await response.json();
        setBuildingCount(data.building_count); // Assuming the backend sends building_count
      } catch (error) {
        console.error("Error counting buildings:", error);
      }
    };

    const fetchEssReport = async () => {
      try {
        // Add latitude and longitude to essData before sending it to the backend
        const essDataWithCoordinates = {
          ...essData,  // Keep the existing ESS data
          lat: latitude,  // Add latitude from state
          lon: longitude  // Add longitude from state
        };
    
        console.log('ESS Data with Coordinates:', essDataWithCoordinates);
    
        const essResponse = await fetch('http://localhost:5000/getEssScore', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(essDataWithCoordinates),  // Send the updated ESS data with coordinates
        });
    
        if (!essResponse.ok) {
          throw new Error('Network response for ESS score was not ok');
        }
    
        const essDataResponse = await essResponse.blob();  // PDF as blob
        
        // Create a link to download the PDF file
        const pdfUrl = window.URL.createObjectURL(essDataResponse);
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.setAttribute('download', 'ESS_Report.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    
      } catch (error) {
        console.error('Error fetching ESS report:', error);
      }
    };
    
    const sendPolygonToBackend = async (coordinates) => {
      try {
        const response = await fetch('http://localhost:5000/count-trees', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ coordinates }),
        });
        const data = await response.json();
        setTreeCount(data.estimated_tree_count);
      } catch (error) {
        console.error('Error counting trees:', error);
      }
    };

    const fetchWeatherData = async (latitude, longitude) => {
      const apiKey = '30f7fd6107dee07d20a062662a888268';
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
      const airPollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

      try {
        // Fetch weather and air quality data
        const weatherResponse = await axios.get(weatherUrl);
        const airPollutionResponse = await axios.get(airPollutionUrl);

        // Prepare flood data for the request
        const floodData = {
          Latitude: latitude,
          Longitude: longitude,
          Rainfall: weatherResponse.data.rain ? weatherResponse.data.rain['1h'] || 0 : 0, 
          Temperature: weatherResponse.data.main.temp,
          Humidity: weatherResponse.data.main.humidity,
          RiverDischarge: 300, 
          WaterLevel: 10, 
          Elevation: 500, 
          LandCover: "Urban", 
          SoilType: mostProbableSoilType, 
          PopulationDensity: 1000, 
          Infrastructure: "Developed", 
          HistoricalFloods: 2 
        };

        // Fetch earthquake data
        const earthquakeResponse = await fetch('http://localhost:5000/getQuackReport', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Latitude: latitude,
            Longitude: longitude,
          }),
        });

        if (!earthquakeResponse.ok) {
          throw new Error('Network response for earthquake data was not ok');
        }

        const earthquakeData = await earthquakeResponse.json();

        // Fetch flood data
        const floodResponse = await fetch('http://localhost:5000/FloodReport', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(floodData),
        });

        if (!floodResponse.ok) {
          throw new Error('Network response for flood data was not ok');
        }

        const floodDataResponse = await floodResponse.json();
        
        // Update essData in the state with API responses
        setEssData({
          air_quality: airPollutionResponse.data.list[0].main.aqi,
          temperature: weatherResponse.data.main.temp,
          humidity: weatherResponse.data.main.humidity,
          soil_type: floodData.SoilType,
          flood_risk: floodDataResponse['Flood Will Ocuur Or Not'],
          seismic_activity: earthquakeData.Seismic_Activity,
          wind_patterns: weatherResponse.data.wind.deg,  // Wind direction
        });

        // Update weatherData state
        setWeatherData({
          temperature: weatherResponse.data.main.temp,
          humidity: weatherResponse.data.main.humidity,
          windSpeed: weatherResponse.data.wind.speed,
          windDeg: weatherResponse.data.wind.deg,
          aqi: airPollutionResponse.data.list[0].main.aqi,
          depth: earthquakeData.Depth,
          magnitude: earthquakeData.Magnitude,
          seismicActivity: earthquakeData.Seismic_Activity,
          floodPrediction: floodDataResponse['Flood Will Ocuur Or Not'],
        });
        
      } catch (error) {
        console.error('Error fetching weather, earthquake, flood, or ESS score data:', error);
      }
    };
    useEffect(() => {
      if (essData.air_quality !== null) { 
        // Ensure essData is fully populated before fetching ESS score
        fetchEssScore(); 
      }
    }, [essData]); 
    const handleCreated = (e) => {
      const geoJsonData = e.layer.toGeoJSON();
      const coordinates = geoJsonData.geometry.coordinates[0];
      
      // Ensure a polygon with four points is drawn
      if (coordinates.length !== 5) {
        console.warn('Please draw a polygon with exactly four points.');
        return;
      }
      setPoints(coordinates);
      

      const [longitude, latitude] = coordinates[0];
      setLatitude(latitude);
      setLongitude(longitude);
  // setEssData((prevEssData) => ({
  //   ...prevEssData,
  //   lat: latitude,
  //   lon: longitude,
  // }));

      sendPolygonToBackend(coordinates);
      sendPolygonToBackendForBuildings(coordinates);
      fetchSoilData(coordinates)
      fetchWeatherData(latitude, longitude); 
      
      fetchEssScore();
      // Fetch all necessary data based on selected location
    };
    const handleFormSubmit = (data) => {
      // Set the data from FactoryForm into the factoryData state
      setFactoryData(data);
    };
  
    return (
      <div className="relative bg-white rounded-lg shadow-lg p-6">
      <MapContainer
    center={[23.0225, 72.5714]} // Ahmedabad's coordinates
    zoom={12}
    maxBounds={[[22.8, 72.3], [23.2, 72.8]]}
    maxBoundsViscosity={1.0}
    style={{ height: '500px', width: '100%' }}
    whenCreated={(map) => {
      mapInstance.current = map; // Store the map instance in ref
    }}
  >
    <LayersControl position="topright">
      {/* Base Layers */}
      <LayersControl.BaseLayer checked name="Map View">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer name="Satellite">
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; <a href="https://www.esri.com">Esri & NASA</a>'
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="flood">
      <WMSTileLayer
    url="https://floodmap.modaps.eosdis.nasa.gov/arcgis/services/Flood/Current/MapServer/WMSServer"
    layers="1"
    format="image/png"
    transparent={true}
  />

      </LayersControl.BaseLayer>

      {/* Environmental Layers */}
      <LayersControl.Overlay name="Air Quality">
        <TileLayer
          url="https://tiles.aqicn.org/tiles/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://waqi.info/">World Air Quality Index Project</a>'
        />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Global Surface Water">
        <TileLayer
          url="https://global-surface-water.appspot.com/tiles/dynamic/{z}/{x}/{y}.png"
          attribution='&copy; European Commission Joint Research Centre (JRC)'
        />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Flood Risk Zones">
        <TileLayer
          url="https://floodtiles.rivergiant.com/tiles/{z}/{x}/{y}.png"
          attribution='&copy; RiverGiant.com'
        />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Nighttime Lights">
        <TileLayer
          url="https://tiles.nightlights.io/tiles/{z}/{x}/{y}.png"
          attribution='&copy; NASA'
        />
      </LayersControl.Overlay>

      <LayersControl.Overlay name="Protected Areas">
        <TileLayer
          url="https://protectedplanet.net/tiles/{z}/{x}/{y}.png"
          attribution='&copy; Protected Planet (WDPA)'
        />
      </LayersControl.Overlay>

    </LayersControl>

    {/* Drawing tools */}
    <FeatureGroup>
      <EditControl
        position="topright"
        onCreated={handleCreated}
        draw={{
          rectangle: true,
          polygon: true,
          circle: false,
          marker: false,
          polyline: false,
          circlemarker: false,
        }}
      />
    </FeatureGroup>
  </MapContainer>


        <button
          onClick={fetchEssReport}  // Call fetchEssReport on click
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Generate Report 
        </button>
        <p>Environmental Sustainibility Score: {essScore}</p>

{/* Pass the calculated factory data to ConstructionData */}
     <BeforeConstruction
        aqi={weatherData?.aqi}
        temperature={weatherData?.temperature}
        windSpeed={weatherData?.windSpeed}
        humidity={weatherData?.humidity}
        magnitude={weatherData?.magnitude}
        treeCount={treeCount}
        seismicActivity={weatherData?.seismicActivity}
        floodPrediction={weatherData?.floodPrediction}
        buildCount={buildCount}
        soilType={mostProbableSoilType}
        onShowFactoryForm={toggleFactoryForm} // Pass the toggle function as a prop
      />
      {isFactoryFormVisible && <FactoryForm onSubmit={handleFormSubmit} />} {/* Conditionally render the FactoryForm */}
        </div>
    );  
  }

  export default MapComponent;
