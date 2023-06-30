import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import carouselItem1 from "../../assets/carouselItem1.jpeg";
import carouselItem2 from "../../assets/carouselItem2.jpeg";
import carouselItem3 from "../../assets/carouselItem3.jpeg";

const Container = styled.div`
  position: relative;
  overflow: hidden;
`;

const Button = styled.button`
  position: absolute;
  top: calc(50% - 1rem);
  z-index: 100;

  font-size: 2rem;
  color: white;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  cursor: pointer;
`;

const SliderContainer = styled.div`
  display: inline-flex;
`;

const Slide = styled.img`
  width: 100%;
`;

const DotContainer = styled.div`
  position: absolute;
  z-index: 10;
  bottom: 0.5rem;

  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dot = styled.button`
  padding: 0.25rem;
  background-color: rgba(0, 0, 0, 0);
  color: #00000075;
  border: none;
  cursor: pointer;

  &.active {
    color: #ffffff75;
  }
`;

function Carousel({ width, time, arrowButton, dotButton }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef();
  const TOTAL_SLIDES = 2;

  const handleNextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide((currentSlide) => currentSlide + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide((currentSlide) => currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translate(-${currentSlide}00%)`;

    const timer = setTimeout(() => {
      handleNextSlide();
    }, time);

    return () => clearTimeout(timer);
  }, [currentSlide, time]);

  return (
    <Container style={{ width }}>
      <SliderContainer ref={slideRef}>
        <Slide src={carouselItem1} />
        <Slide src={carouselItem2} />
        <Slide src={carouselItem3} />
      </SliderContainer>

      {dotButton && (
        <DotContainer>
          {Array.from({ length: TOTAL_SLIDES + 1 }, (v, i) => i).map((num) => (
            <Dot
              key={num}
              className={num === currentSlide && "active"}
              onClick={() => setCurrentSlide(num)}
            >
              ●
            </Dot>
          ))}
        </DotContainer>
      )}

      {arrowButton && (
        <>
          <Button onClick={handlePrevSlide} style={{ left: 0 }}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAfElEQVR4nO2XMQqAMBAEh1Ms9C/6AittlXxB/IL+3yYBG8HGbJAbSD3LkhwX+DG1SmzAChxAn1teAQE445mU8g1oc9YebvId6Fz+Nea14xcOf2p5GFXjtZgAphw4CQ+R8CYS3kTCmyiqiUq5lj+FmBFgwBK/ZgNCGqX8NRevhSysSiahIgAAAABJRU5ErkJggg==" />
          </Button>
          <Button onClick={handleNextSlide} style={{ right: 0 }}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAe0lEQVR4nO2XMQqAMBAEBxWLe4z4ASuxVAQ/YP6g/xckgo1lPCW7kHqH5e7Iwk9UeZo3wAZMQOEB0AN7fDNQvg1gQPgCxHqDWASBkkAzcUrbcUlJPJ3tjpwAzPM2mMxR7Gjg0suyXrXg+S0fvDtBG6vZ6FXNAGov4+Q6AC9HLK6rbqMeAAAAAElFTkSuQmCC" />
          </Button>
        </>
      )}
    </Container>
  );
}

Carousel.propTypes = {
  width: PropTypes.string,
  time: PropTypes.number,
  arrowButton: PropTypes.bool,
  dotButton: PropTypes.bool,
};

Carousel.defaultProps = {
  width: "600px",
  time: 2000,
  arrowButton: true,
  dotButton: true,
};

export default Carousel;