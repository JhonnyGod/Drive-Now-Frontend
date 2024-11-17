import React, { useState } from 'react';
import styles from './VehicleCarousel.module.css';

const vehicles = [
  {
    id: 1,
    name: "Sedan Económico",
    description: "Perfecto para viajes en ciudad y bajo consumo.",
    imageUrl: "https://i.ibb.co/8YhPvp4/chevrolet-corvette-c8-ferrari-testarossa-render.jpg"
  },
  {
    id: 2,
    name: "SUV Familiar",
    description: "Espacioso y cómodo para toda la familia.",
    imageUrl: "https://i.ibb.co/8YhPvp4/chevrolet-corvette-c8-ferrari-testarossa-render.jpg"
  },
  {
    id: 3,
    name: "Deportivo de Lujo",
    description: "Experimenta la adrenalina y el estilo.",
    imageUrl: "https://i.ibb.co/8YhPvp4/chevrolet-corvette-c8-ferrari-testarossa-render.jpg"
  },
];

const CarouselButton = ({ onClick, className, children }) => (
  <button onClick={onClick} className={`${styles.carouselNavButton} ${className}`}>
    {children}
  </button>
);

const VehicleCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % vehicles.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + vehicles.length) % vehicles.length);
  };

  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.carouselTitle}>Nuestros Vehículos</h2>
      <div className={styles.carouselWrapper}>
        <div className={styles.carouselSlides} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className={styles.carouselSlide}>
              <div className={styles.carouselCard}>
                <img src={vehicle.imageUrl} alt={vehicle.name} className={styles.carouselImage} />
                <h3>{vehicle.name}</h3>
                <p>{vehicle.description}</p>
                <button className={styles.carouselButton}>Ver más información</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CarouselButton onClick={prevSlide} className={styles.carouselNavLeft}>&#8249;</CarouselButton>
      <CarouselButton onClick={nextSlide} className={styles.carouselNavRight}>&#8250;</CarouselButton>
    </div>
  );
};

export default VehicleCarousel;
