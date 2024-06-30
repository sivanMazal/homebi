import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../../css/buildingHomePage.css";
import { useEffect } from 'react';

const Card = ({ item }) => {
    useEffect(() => {
        AOS.init({
          duration: 1000,  // Animation duration in milliseconds
          once: true,      // Whether to only animate elements once
          easing: 'ease',  // Easing function for the animation
          // More options...
        });
        AOS.refresh(); 
      }, []);
    return (
            <div className="center">
                <div className='iconCard'>{item.icon}</div>
                <h4 className=' fw-bold'>{item.title}</h4>
                <div>{item.desc}</div>
            </div>
    )
}

export default Card