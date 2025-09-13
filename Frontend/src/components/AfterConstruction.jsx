import React, { useEffect, useState } from 'react';
import {
  FaCloudSun,
  FaWind,
  FaTemperatureHigh,
  FaTint,
  FaSmog,
  FaTree,
  FaRecycle,
  FaIndustry
} from 'react-icons/fa';

const AfterConstruction = ({ factoryData }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if factoryData has been populated
    if (factoryData && Object.keys(factoryData).length > 0) {
      setIsLoading(false); // Stop loading if data is present
    }
  }, [factoryData]); // Dependency on factoryData

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-2xl p-10 mb-8 h-[450px] overflow-hidden transition duration-300 ease-in-out">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">After Construction</h2>
        <p className="text-center text-gray-600">Loading data, please wait...</p>
      </div>
    );
  }

  const {
    emissionsWeight,
    foundationVolume,
    fuelEmissions,
    impactCategory,
    materialUsage,
    overallImpact,
    pm10Emission,
    totalEmissions
  } = factoryData;

  return (
    <div className="w-full max-w-7xl bg-white shadow-2xl rounded-2xl p-10 mb-8 h-[450px] overflow-hidden transition duration-300 ease-in-out">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">After Construction</h2>

      <div className="flex flex-wrap justify-between items-start h-full">
        {/* Emissions Weight */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center mb-6 w-full sm:w-1/2 lg:w-1/4 hover:shadow-xl transition-all duration-300 ease-in-out">
          <FaIndustry className="text-gray-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Emissions Weight</h3>
            <p className="text-gray-600">{emissionsWeight ? `${emissionsWeight} kg` : 'N/A'}</p>
          </div>
        </div>

        {/* Foundation Volume */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center mb-6 w-full sm:w-1/2 lg:w-1/4 hover:shadow-xl transition-all duration-300 ease-in-out">
          <FaIndustry className="text-gray-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Foundation Volume</h3>
            <p className="text-gray-600">{foundationVolume ? `${foundationVolume} m³` : 'N/A'}</p>
          </div>
        </div>

        {/* Fuel Emissions (Coal) */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center mb-6 w-full sm:w-1/2 lg:w-1/4 hover:shadow-xl transition-all duration-300 ease-in-out">
          <FaRecycle className="text-red-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Fuel Emissions (Coal)</h3>
            <p className="text-gray-600">{fuelEmissions?.Coal ? `${fuelEmissions.Coal} kg` : 'N/A'}</p>
          </div>
        </div>

        {/* Impact Category */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center mb-6 w-full sm:w-1/2 lg:w-1/4 hover:shadow-xl transition-all duration-300 ease-in-out">
          <FaRecycle className="text-green-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Impact Category</h3>
            <p className="text-gray-600">{impactCategory || 'N/A'}</p>
          </div>
        </div>

        {/* Material Usage */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center mb-6 w-full sm:w-1/2 lg:w-1/4 hover:shadow-xl transition-all duration-300 ease-in-out">
          <FaRecycle className="text-green-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Material Usage</h3>
            <p className="text-gray-600">
              Concrete: {materialUsage?.Concrete || '0'} kg, Steel: {materialUsage?.Steel || '0'} kg, 
              Wood: {materialUsage?.Wood || '0'} kg, Brick: {materialUsage?.Brick || '0'} kg, 
              Glass: {materialUsage?.Glass || '0'} kg
            </p>
          </div>
        </div>

        {/* Overall Impact */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center mb-6 w-full sm:w-1/2 lg:w-1/4 hover:shadow-xl transition-all duration-300 ease-in-out">
          <FaRecycle className="text-green-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Overall Impact</h3>
            <p className="text-gray-600">{overallImpact || 'N/A'}</p>
          </div>
        </div>

        {/* PM10 Emission */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center mb-6 w-full sm:w-1/2 lg:w-1/4 hover:shadow-xl transition-all duration-300 ease-in-out">
          <FaCloudSun className="text-yellow-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">PM10 Emission</h3>
            <p className="text-gray-600">{pm10Emission ? `${pm10Emission} µg/m³` : 'N/A'}</p>
          </div>
        </div>

        {/* Total Emissions */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center mb-6 w-full sm:w-1/2 lg:w-1/4 hover:shadow-xl transition-all duration-300 ease-in-out">
          <FaRecycle className="text-red-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Emissions</h3>
            <p className="text-gray-600">{totalEmissions ? `${totalEmissions} kg` : 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfterConstruction;
