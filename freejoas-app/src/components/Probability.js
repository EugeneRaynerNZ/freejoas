import React from 'react';
import HighIcon from '../images/high.svg';
import MediumIcon from '../images/medium.svg';
import LowIcon from '../images/low.svg';

const Probability = ({ text, type }) => {
  // Define icons and background colors for different types
  const iconTypes = {
    high: { icon: <img src={HighIcon} alt="High Icon" />, backgroundColor: '#CDF0CC' },
    medium: { icon: <img src={MediumIcon} alt="Medium Icon" />, backgroundColor: '#F0E6CC' },
    low: { icon: <img src={LowIcon} alt="Low Icon" />, backgroundColor: '#F0CCCC' },
  };

  // Get the icon and background color based on the type, default to high if type is not recognized
  const { icon, backgroundColor } = iconTypes[type] || iconTypes.high;

  return (
    <div className="probability" style={{ backgroundColor: backgroundColor }}>
      {icon}
      <span>{text}</span>
    </div>
  );
}

export default Probability;