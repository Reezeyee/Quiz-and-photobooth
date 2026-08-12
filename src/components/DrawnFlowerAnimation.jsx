import React from 'react';
import { motion } from 'framer-motion';

export const DrawnFlowerAnimation = ({
  size = 140,
  color = "#FFB7C5",
  centerColor = "#FFF5BA",
  duration = 2.2,
  isRevealed = false
}) => {
  // SVG paths for hand-drawn flower elements
  const stemPath = "M 50 110 C 48 90, 52 70, 50 50";
  const leafLeftPath = "M 49 85 C 30 80, 25 65, 48 70";
  const leafRightPath = "M 51 72 C 70 67, 75 52, 52 57";

  // 8 Petal paths radiating from center (50, 40)
  const petalPaths = [
    "M 50 40 C 40 20, 60 20, 50 40", // Top
    "M 50 40 C 65 25, 75 42, 50 40", // Top-Right
    "M 50 40 C 70 40, 70 60, 50 40", // Right
    "M 50 40 C 65 55, 52 70, 50 40", // Bottom-Right
    "M 50 40 C 40 60, 60 60, 50 40", // Bottom
    "M 50 40 C 35 55, 48 70, 50 40", // Bottom-Left
    "M 50 40 C 30 40, 30 60, 50 40", // Left
    "M 50 40 C 35 25, 25 42, 50 40"  // Top-Left
  ];

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="flowerSketchFilter" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        {/* 1. Stem Drawing Animation */}
        <motion.path
          d={stemPath}
          stroke="#3A2E2B"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: duration * 0.4, ease: "easeOut" }}
          filter="url(#flowerSketchFilter)"
        />
        <motion.path
          d={stemPath}
          stroke="#55EFC4"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: duration * 0.4, ease: "easeOut" }}
        />

        {/* 2. Leaves Drawing Animation */}
        <motion.path
          d={leafLeftPath}
          fill="#E2F0CB"
          stroke="#3A2E2B"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: duration * 0.3, delay: duration * 0.3, ease: "easeOut" }}
          filter="url(#flowerSketchFilter)"
        />
        <motion.path
          d={leafRightPath}
          fill="#E2F0CB"
          stroke="#3A2E2B"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: duration * 0.3, delay: duration * 0.4, ease: "easeOut" }}
          filter="url(#flowerSketchFilter)"
        />

        {/* 3. Petals Drawing Animation (Blooming line-by-line) */}
        {petalPaths.map((petal, index) => (
          <g key={index}>
            {/* Soft Crayon Shading Fill */}
            <motion.path
              d={petal}
              fill={color}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isRevealed ? 0.9 : 0.6, scale: 1 }}
              transition={{ duration: 0.5, delay: duration * 0.5 + index * 0.08 }}
            />
            {/* Hand-Drawn Pencil Outline */}
            <motion.path
              d={petal}
              stroke="#3A2E2B"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: duration * 0.4 + index * 0.08, ease: "easeInOut" }}
              filter="url(#flowerSketchFilter)"
            />
          </g>
        ))}

        {/* 4. Flower Center Drawing */}
        <motion.circle
          cx="50"
          cy="40"
          r="13"
          fill={centerColor}
          stroke="#3A2E2B"
          strokeWidth="3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: duration * 0.85, ease: "backOut" }}
          filter="url(#flowerSketchFilter)"
        />

        {/* 5. Hand-Drawn Cute Smile Face in Flower Center */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: duration * 0.95 }}
        >
          <circle cx="45" cy="38" r="2" fill="#3A2E2B" />
          <circle cx="55" cy="38" r="2" fill="#3A2E2B" />
          <path d="M 46 43 C 48 46, 52 46, 54 43" stroke="#3A2E2B" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="42" cy="41" r="2" fill="#FF8DA1" opacity="0.8" />
          <circle cx="58" cy="41" r="2" fill="#FF8DA1" opacity="0.8" />
        </motion.g>
      </svg>
    </div>
  );
};
