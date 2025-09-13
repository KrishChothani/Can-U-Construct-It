import React from 'react';
import { FaCloud, FaWind, FaSmog, FaExclamationTriangle, FaRecycle } from 'react-icons/fa';
import ConstructionData from './ConstructionData';

const DuringConstruction = ({ tempRiseAqi, dustLevel, envEffects }) => {
  // Function to interpret AQI rise
  const getAqiDescription = (aqi) => {
    switch (aqi) {
      case 1:
        return 'Good';
      case 2:
        return 'Fair';
      case 3:
        return 'Moderate';
      case 4:
        return 'Poor';
      case 5:
        return 'Very Poor';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="w-full max-w-7xl bg-white shadow-2xl rounded-2xl p-10 mb-8 h-[450px] overflow-hidden">
      <h2 className="text-3xl font-bold text-orange-700 mb-6 text-center">During Construction</h2>
      
      <div className="flex flex-wrap justify-center items-start h-full">
        {/* Temporary AQI Rise */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center mb-6 mx-4 w-full md:w-1/2 lg:w-1/4 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
          <FaExclamationTriangle className="text-red-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Temporary AQI Rise</h3>
            <p className="text-gray-600">{tempRiseAqi ? `${tempRiseAqi} (${getAqiDescription(tempRiseAqi)})` : 'Loading...'}</p>
          </div>
        </div>

        {/* Dust Level */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center mb-6 mx-4 w-full md:w-1/2 lg:w-1/4 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
          <FaSmog className="text-gray-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Dust Level</h3>
            <p className="text-gray-600">{dustLevel ? `${dustLevel} µg/m³` : 'Loading...'}</p>
          </div>
        </div>
       
        {/* Environmental Effects */}
        {/* Uncomment and update this section if needed */}
        {/* 
        <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center mb-6 mx-4 w-full md:w-1/2 lg:w-1/3 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
          <FaRecycle className="text-green-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Environmental Effects</h3>
            <p className="text-gray-600">{envEffects ? envEffects : 'Loading...'}</p>
          </div>
        </div> 
        */}
      </div>
    </div>
  );
};

export default DuringConstruction;
