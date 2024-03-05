import React from 'react';

function NumberToColorGradient({ number }) {
    const minNumber = 0; // Define your minimum number

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
    const clampedNumber = Math.max(number, minNumber);
  
    // Calculate the ratio between 0 and the input number
    const ratio = clampedNumber / number;
  
    // Interpolate the color based on the ratio
    const interpolatedColor = interpolateColor(minColor, maxColor, ratio);
  
    // Convert RGB values to hex
    const hexColor = "#" + interpolatedColor.map(c => c.toString(16).padStart(2, "0")).join("");

    return <span className="text-4xl" style={{ color: hexColor }}>{number}</span>;
}

export default NumberToColorGradient;
