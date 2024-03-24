import React from 'react';

function NumberToColorGradient({ number }) {
    const minNumber = 0; // Define your minimum number
    const maxNumber = 1000; // Define your maximum number for interpolation

    const minColor = [48, 115, 81]; // RGB values for #307351
    const maxColor = [255, 0, 0]; // RGB values for #ff0000
  
    // Interpolate between minColor and maxColor based on the input number
    const interpolateColor = (minColor, maxColor, ratio) => {
      const result = [];
      for (let i = 0; i < 3; i++) {
        result.push(Math.round(minColor[i] + ratio * (maxColor[i] - minColor[i])));
      }
      return result;
    };
  
    // Clamp the input number between minNumber and maxNumber
    const clampedNumber = Math.max(Math.min(number, maxNumber), minNumber);
  
    // Calculate the ratio between 0 and 1 based on the clamped number
    const ratio = clampedNumber / maxNumber;
  
    // Interpolate the color based on the ratio
    const interpolatedColor = interpolateColor(minColor, maxColor, ratio);
  
    // Convert RGB values to hex
    const hexColor = "#" + interpolatedColor.map(c => c.toString(16).padStart(2, "0")).join("");

    return <h3 style={{ color: hexColor }}>{number}</h3>;
}

export default NumberToColorGradient;
