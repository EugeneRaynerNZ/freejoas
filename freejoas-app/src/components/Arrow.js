import { useEffect } from 'react';

function ArrowToPointLocation({ targetLatitude, targetLongitude, currentLatitude, currentLongitude, deviceOrientation }) {
  useEffect(() => {
    const pointArrowToLocation = () => {
      if (targetLatitude && targetLongitude && currentLatitude && currentLongitude && deviceOrientation) {
        // Calculate the angle between current location and target location
        const angle = Math.atan2(
          targetLongitude - currentLongitude,
          targetLatitude - currentLatitude
        ) * (180 / Math.PI);

        // Adjust the angle based on device orientation
        const adjustedAngle = angle - deviceOrientation.alpha;

        // Rotate the arrow to point towards the adjusted angle
        const arrowElement = document.getElementById('arrow');
        arrowElement.style.transform = `rotate(${adjustedAngle}deg)`;
      }
    };

    // Call the function when the component mounts and whenever any of the dependencies change
    pointArrowToLocation();
  }, [targetLatitude, targetLongitude, currentLatitude, currentLongitude, deviceOrientation]);

  return null; // Component doesn't render anything directly
}

export default ArrowToPointLocation;
