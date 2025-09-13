import React from 'react';
// import Navbar from './components/Navbar';
import MapComponent from './components/MapComponent';
import BeforeConstruction from './components/BeforeConstruction';
import DuringConstruction from './components/DuringConstruction';
import EnvironmentalImpactForm from './components/InputForm';
// import Navbar from './components/navbar';
import AfterConstruction from './components/AfterConstruction';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-gray-100">
      {/* Navbar */}
      {/* <Navbar /> */}
      {/* <Navbar /> */}

      {/* Main content */}
      <div className="flex flex-col items-center py-12 px-4">
        {/* Map section */}
        <div className="w">
          <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">Interactive Map</h2>
          <MapComponent />
          {/* <EnvironmentalImpactForm /> */}
          
          
        </div>

        {/* Before Construction section */}
        {/* <div className="h-6 w-full max-w-7xl bg-white shadow-xl rounded-xl p-8 mb-12">
          <BeforeConstruction />
        </div> */}
      </div>
    </div>
  );
};

export default App;
