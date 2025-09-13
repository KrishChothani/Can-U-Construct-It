import React from 'react';
import BeforeConstruction from './BeforeConstruction';
import DuringConstruction from './DuringConstruction'; // Make sure to import your new component
import AfterConstruction from './AfterConstruction'; // Make sure to import your new component

const ConstructionCarousel = ({ weatherData }) => {
//   const { temperature, humidity, windSpeed, aqi, treeCount, soiltype } = weatherData;

  return (
    <div className="carousel w-full">
      {/* Before Construction Slide */}
      <div id="slide1" className="carousel-item relative w-full">
        {/* <BeforeConstruction 
          aqi={aqi}
          humidity={humidity}
          treeCount={treeCount}
          temperature={temperature}
          windSpeed={windSpeed}
          soilType="Loamy Soil" // Add any default values
          /> */}
          <DuringConstruction/>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide4" className="btn btn-circle">❮</a>
          <a href="#slide2" className="btn btn-circle">❯</a>
        </div>
      </div>

      {/* During Construction Slide */}
      <div id="slide2" className="carousel-item relative w-full">
        <DuringConstruction/>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn btn-circle">❮</a>
          <a href="#slide3" className="btn btn-circle">❯</a>
        </div>
      </div>

      {/* After Construction Slide */}
      <div id="slide3" className="carousel-item relative w-full">
        <DuringConstruction/>
       <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide2" className="btn btn-circle">❮</a>
          <a href="#slide4" className="btn btn-circle">❯</a>
        </div>
      </div>

      {/* Fourth Slide (Optional) */}
      <div id="slide4" className="carousel-item relative w-full">
        <img
          src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
          className="w-full"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide3" className="btn btn-circle">❮</a>
          <a href="#slide1" className="btn btn-circle">❯</a>
        </div>
      </div>
    </div>
  );
};

export default ConstructionCarousel;
