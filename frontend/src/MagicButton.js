import React, { useState } from 'react';
import { FaFilePdf } from 'react-icons/fa';

const MagicButton = ({ onClick, label }) => {
  const [stars, setStars] = useState(Array.from({ length: 8 })); // 8 stars

  return (
    <button
      className="magic-button"
      onClick={onClick}
      style={{
        padding: '10px 70px', // Increase width, lower height
        fontSize: '16px', // Adjust font size if needed
        borderRadius: '8px', // Optional: round the corners
        position: 'relative', // Ensure the stars are positioned relative to the button
        overflow: 'hidden', // Prevent stars from going outside the button
      }}
    >
      {label}
      <div className="stars">
        {stars.map((_, index) => (
          <div
            key={index}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 1.5}s`,
            }}
          />
        ))}
      </div>
    </button>
  );
};

export default MagicButton;