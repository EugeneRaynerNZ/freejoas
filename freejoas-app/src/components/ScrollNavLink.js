import React from 'react';

const ScrollNavLink = ({ to, activeLink, children }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const section = document.querySelector(to);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 60, // Adjust as needed for offset
        behavior: 'smooth',
      });
    }
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={activeLink === to ? 'active' : ''}
    >
      {children}
    </a>
  );
};

export default ScrollNavLink;
