import React, { useState } from 'react';

const BigButton = ({ onClick, label }) => {
  const [stars, setStars] = useState(Array.from({ length: 8 })); // 8 stars for animation

  return (
    <button
      className="big-button"
      onClick={onClick}
      style={{
        padding: '16px 80px', // Default padding for medium screens
        fontSize: '20px', // Default font size
        borderRadius: '50px',
        backgroundColor: '#3B82F6',
        color: '#ffffff',
        fontWeight: 'bold',
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
      }}
    >
      {label}
      {/* Star animations */}
      <div className="stars">
        {stars.map((_, index) => (
          <div
            key={index}
            className="star"
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              animation: `float 1.5s ease-in-out ${Math.random() * 1.5}s infinite`,
            }}
          />
        ))}
      </div>

      {/* CSS for star animation and responsiveness */}
      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0);
              opacity: 1;
            }
            50% {
              transform: translateY(-10px);
              opacity: 0.8;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }

          /* Responsive styling for BigButton */
          .big-button {
            padding: 16px 80px;
            font-size: 20px;
          }

          /* Large screens */
          @media (min-width: 1024px) {
            .big-button {
              padding: 30px 200px; /* Larger padding */
              font-size: 24px; /* Larger font size */
            }
          }

          /* Small screens */
          @media (max-width: 640px) {
            .big-button {
              padding: 12px 60px; /* Smaller padding */
              font-size: 18px; /* Smaller font size */
              border-radius: 40px; /* Slightly reduced roundness */
            }
          }
        `}
      </style>
    </button>
  );
};

export default BigButton;