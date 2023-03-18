import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.css';

function BackButton() {
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState('');
  const [textColor, setTextColor] = useState('');

  useEffect(() => {
    setRandomColors();
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const setRandomColors = () => {
    const colorPalette = [
      '#FFC107',
      '#FF5722',
      '#9C27B0',
      '#3F51B5',
      '#009688',
      '#795548',
    ];

    const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    const contrastColor = getContrastColor(randomColor);

    setBgColor(randomColor);
    setTextColor(contrastColor);
  };

  const getContrastColor = (color) => {
    const luminance = getLuminance(color);

    if (luminance > 0.5) {
      return '#000000';
    } else {
      return '#FFFFFF';
    }
  };

  const getLuminance = (color) => {
    const rgb = hexToRgb(color);

    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    return (max + min) / 2;
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  return (
    <button
      className={styles.goBack}
      onClick={handleGoBack}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      Go Back
    </button>
  );
}

export default BackButton;
