import React from 'react';

function MeterToKilometerConverter({ meters }) {
  const convertToKilometer = (meters) => {
    if (meters <= 1000) {
      return `${meters} meters`;
    } else {
      const kilometers = meters / 1000;
      return `${kilometers} kilometers`;
    }
  };

  const result = convertToKilometer(meters);

  return (
      <span>{result}</span>
  );
}

export default MeterToKilometerConverter;