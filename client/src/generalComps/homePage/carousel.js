import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../css/carousel.css';

const CarouselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleSlideChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-container">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        useKeyboardArrows
        stopOnHover={false}
        dynamicHeight={false}
        selectedItem={currentIndex}
        onChange={handleSlideChange}
      >
        <div className="slide">
          <img src="/images/homePage1.jpg" alt="Image 1" />
        </div>
        <div className="slide">
        <img src="/images/homePage2.jpg" alt="Image 1" />
        </div>
        <div className="slide">
        <img src="/images/homePage3.jpg" alt="Image 1" />
        </div>
        <div className="slide">
        <img src="/images/homePage4.jpg" alt="Image 1" />
        </div>
      </Carousel>
      <button className="arrow prev" onClick={handlePrevClick} disabled={currentIndex === 0}>
        &lt;
      </button>
      <button className="arrow next" onClick={handleNextClick} disabled={currentIndex === 3}>
        &gt;
      </button>
    </div>
  );
};

export default CarouselComponent;
