import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import './oneItem.css'

const OneItem = ({ height }) => {
  const [rotation, setRotation] = useState(0); // Rotation around the Y-axis
  const [translationY, setTranslationY] = useState(-height / 2); // Start from bottom

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prevRotation) => prevRotation + 10); // Rotate 10 degrees at each interval
      setTranslationY((prevTranslationY) => {
        const newTranslationY = prevTranslationY + 2; // Move upward
        return newTranslationY > height / 2 ? -height / 2 : newTranslationY; // Reset to start when reaching top
      });
    }, 500); // Adjust interval timing for speed of rotation and translation

    return () => clearInterval(interval); // Cleanup on unmount
  }, [height]);

  return (
    <div className="perspective-wrapper1">
      <div
        className="rotating-item1"
        style={{
          transform: `rotateY(${rotation}deg) translateY(${translationY}px) translateZ(200px)`,
        }}
      />
    </div>
  );
};

export default OneItem;
