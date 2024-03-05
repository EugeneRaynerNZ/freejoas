import React, { useEffect } from 'react';

function ArrowToPointLocation({ targetLatitude, targetLongitude, currentLatitude, currentLongitude }) {
  useEffect(() => {
    const pointArrowToLocation = () => {
      // Calculate the angle between current location and target location
      const angle = Math.atan2(
        targetLongitude - currentLongitude,
        targetLatitude - currentLatitude
      ) * (180 / Math.PI);

      // Rotate the arrow to point towards the target location
      const arrowElement = document.getElementById('arrow');
      arrowElement.style.transform = `rotate(${angle}deg)`;
    };

    // Call the function when the component mounts
    pointArrowToLocation();
  }, [targetLatitude, targetLongitude, currentLatitude, currentLongitude]);

  return null; // Component doesn't render anything directly
}

export default ArrowToPointLocation;
