import React, { useState } from 'react';
import '../../css/carousel.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Carousel2 = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [images, setImages] = useState([]);
    const building = useSelector(state => state.buildingSlice.building);

    useEffect(() => {
        setImages(building.images);
    }, [])

    useEffect(() => {
        if (images.length > 0) {
            const interval = setInterval(() => {
                setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
            }, 3000); // Change image every 3 seconds

            return () => {
                clearInterval(interval); // Clear interval on component unmount
            };
        }
    }, [images]);

    const prevImage = () => {
        setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextImage = () => {
        setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

  const divStyle = {
    backgroundImage: `url(${images[currentImage]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

    return (
        <div className="carousel">
            <button onClick={prevImage}>&gt;</button>
            <img src={images[currentImage]} alt="Carousel Image" className='' />
            <button onClick={nextImage}>&lt;</button>
        </div>
    );
};
export default Carousel2;

// export default Carousel;
// import React from 'react';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import Carousel from 'react-gallery-carousel';
// import 'react-gallery-carousel/dist/index.css';
// import { useSelector } from 'react-redux';

// const Carousel2 = () => {
//         const [images, setImages] = useState([]);
//     const building = useSelector(state => state.buildingSlice.building);

//     useEffect(() => {
//         // let i=0;
//         // const images = [900, 800, 700, 600, 500].map((size) => ({
//         //     src: `https://placedog.net/${size}/${size}`
//         //   }));
//         setImages(building.images);
//     }, [])


//   return (
//     images.length>0 && <Carousel images={images} />
//   );
// };

// export default Carousel2;
