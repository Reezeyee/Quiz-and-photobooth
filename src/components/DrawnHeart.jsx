import React from 'react';
import { motion } from 'framer-motion';

export const DrawnHeart = ({
  size = 48,
  color = "#FF6B8B",
  fillColor = "#FFB7C5",
  duration = 1.2,
  delay = 0,
  animateOnMount = true,
  isHovered = false,
  className = "",
  showPencilTip = true
}) => {
  // Hand-drawn heart SVG path (organic cubic bezier curve for sketch feel)
  const heartPath = "M 25 42 C 25 42, 6 29, 6 16 C 6 8.5, 12 4.5, 18 4.5 C 22.5 4.5, 25 8, 25 8 C 25 8, 27.5 4.5, 32 4.5 C 38 4.5, 44 8.5, 44 16 C 44 29, 25 42, 25 42 Z";
  
  // Sketch wobble line 2 for double hand-drawn line effect
  const sketchOverlayPath = "M 25.5 41.5 C 25.5 41.5, 6.5 28.5, 6.5 16 C 6.5 9, 12.2 5, 18.2 5 C 22.3 5, 24.8 8.2, 25.5 8.5 C 26.2 8.2, 27.8 5, 31.8 5 C 37.8 5, 43.5 9, 43.5 16 C 43.5 28.5, 25.5 41.5, 25.5 41.5 Z";

  // Sketch scribble hatch lines inside heart
  const hatchLines = [
    "M 14 16 Q 20 22 26 16",
    "M 16 22 Q 24 28 32 21",
    "M 20 28 Q 25 34 30 28"
  ];

  return (
    <motion.div
      className={`drawn-heart-container ${className}`}
      initial={{ scale: 0.9, opacity: animateOnMount ? 0 : 1 }}
      animate={{ scale: [0.95, 1.05, 1], opacity: 1 }}
      whileHover={{ scale: 1.15, rotate: [-2, 3, -2] }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        cursor: 'pointer'
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="paperSketchFilter" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        {/* Soft Crayon Shading Fill (Animates Opacity after path draws) */}
        <motion.path
          d={heartPath}
          fill={fillColor}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.65, 0.55] }}
          transition={{ duration: 0.6, delay: delay + duration * 0.7 }}
        />

        {/* Primary Hand-Drawn Stroke (Animates pathLength like drawing with pencil/ink!) */}
        <motion.path
          d={heartPath}
          stroke={color}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="120"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: duration, ease: "easeInOut", delay: delay },
            opacity: { duration: 0.1, delay: delay }
          }}
          filter="url(#paperSketchFilter)"
        />

        {/* Second Sketchy Accent Stroke to look like genuine pen/pencil doodle */}
        <motion.path
          d={sketchOverlayPath}
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="2 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{
            pathLength: { duration: duration * 1.1, ease: "easeInOut", delay: delay + 0.1 },
            opacity: { duration: 0.2, delay: delay + 0.1 }
          }}
        />

        {/* Sketch Scribble Hatching inside */}
        {hatchLines.map((line, idx) => (
          <motion.path
            key={idx}
            d={line}
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{
              duration: 0.4,
              delay: delay + duration * 0.8 + idx * 0.1,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Pencil Tip Indicator during drawing animation */}
        {showPencilTip && (
          <motion.circle
            r="3.5"
            fill="#3A2E2B"
            stroke="#FFF5BA"
            strokeWidth="1"
            initial={{ opacity: 1 }}
            animate={{
              opacity: [1, 1, 0]
            }}
            transition={{
              duration: duration + 0.2,
              delay: delay,
              times: [0, 0.95, 1]
            }}
          />
        )}
      </svg>
    </motion.div>
  );
};
