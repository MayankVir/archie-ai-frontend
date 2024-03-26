import React, { useState, useEffect } from "react";
import "./FadingText.css"; // CSS file for styling

const FadingText = ({ textArray }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 3000); // Change text every 3 seconds, adjust as needed

    return () => clearInterval(interval);
  }, [textArray]);

  return (
    <div className="fading-text-container ">
      {textArray.map((text, index) => (
        <div
          key={index}
          className={`fading-text w-[300px]  ${
            index === currentTextIndex ? "active" : ""
          }`}
        >
          {text}
        </div>
      ))}
    </div>
  );
};

export default FadingText;
