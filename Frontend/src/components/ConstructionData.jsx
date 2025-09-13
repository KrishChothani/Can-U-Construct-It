import React, { useState } from 'react';
import BeforeConstruction from './BeforeConstruction';
import DuringConstruction from './DuringConstruction';
import AfterConstruction from './AfterConstruction';

const ConstructionData = ({
  weatherData,
  treeCount,
  buildCount,
  mostProbableSoilType,
  constructionStageData,
  factoryData
}) => {
  // Carousel logic starts here
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
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
    />,
    <DuringConstruction treeCount={treeCount} buildCount={buildCount} />,
    <AfterConstruction treeCount={treeCount} buildCount={buildCount} factoryData={factoryData}/>,
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="construction-data">
      <h2 className="text-2xl font-bold mb-4">Construction Data</h2>

      {/* Carousel Component */}
      <div className="relative w-full overflow-hidden">
        {/* Carousel Wrapper */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {/* Slide Components */}
          {slides.map((SlideComponent, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              {SlideComponent}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
          <button
            onClick={handlePrev}
            className="btn btn-circle bg-white border border-gray-300 hover:bg-gray-200 transition"
          >
            ❮
          </button>
          <button
            onClick={handleNext}
            className="btn btn-circle bg-white border border-gray-300 hover:bg-gray-200 transition"
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConstructionData;
