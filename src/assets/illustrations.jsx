import React from 'react';
import { motion } from 'framer-motion';

// SVG Paper Sketch Filter Definition
const PaperSketchFilter = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
    <defs>
      <filter id="paperSketch" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.4" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
);

// Cute Hand-Drawn Flower SVG on Paper
export const FlowerIllustration = ({ size = 64, className = "", color = "#FFB7C5" }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`sketch-doodle ${className}`}
    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
  >
    {/* Petals */}
    <ellipse cx="50" cy="26" rx="16" ry="18" fill={color} stroke="#3A2E2B" strokeWidth="3" strokeDasharray="60 2" />
    <ellipse cx="74" cy="50" rx="18" ry="16" fill="#FFC0CB" stroke="#3A2E2B" strokeWidth="3" />
    <ellipse cx="50" cy="74" rx="16" ry="18" fill={color} stroke="#3A2E2B" strokeWidth="3" />
    <ellipse cx="26" cy="50" rx="18" ry="16" fill="#FFC0CB" stroke="#3A2E2B" strokeWidth="3" />
    <ellipse cx="33" cy="33" rx="16" ry="16" fill="#E8DFF5" stroke="#3A2E2B" strokeWidth="2.5" />
    <ellipse cx="67" cy="33" rx="16" ry="16" fill="#E8DFF5" stroke="#3A2E2B" strokeWidth="2.5" />
    <ellipse cx="67" cy="67" rx="16" ry="16" fill="#E2F0CB" stroke="#3A2E2B" strokeWidth="2.5" />
    <ellipse cx="33" cy="67" rx="16" ry="16" fill="#E2F0CB" stroke="#3A2E2B" strokeWidth="2.5" />
    {/* Center */}
    <circle cx="50" cy="50" r="16" fill="#FFF5BA" stroke="#3A2E2B" strokeWidth="3.5" />
    {/* Hand-Drawn Face */}
    <circle cx="44" cy="48" r="2.5" fill="#3A2E2B" />
    <circle cx="56" cy="48" r="2.5" fill="#3A2E2B" />
    <path d="M46 53 C48 56, 52 56, 54 53" stroke="#3A2E2B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <circle cx="41" cy="51" r="2.5" fill="#FF8DA1" opacity="0.75" />
    <circle cx="59" cy="51" r="2.5" fill="#FF8DA1" opacity="0.75" />
  </motion.svg>
);

// Petal Illustration (Drawn on paper)
export const PetalIllustration = ({ size = 32, className = "", color = "#FFB7C5" }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M25 5C38 18, 45 35, 25 45C5 35, 12 18, 25 5Z"
      fill={color}
      stroke="#3A2E2B"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.9"
    />
  </svg>
);

// Hand-Drawn Cat SVG
export const CatIllustration = ({ size = 80, mood = "happy", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M25 40 L18 15 L40 30 Z" fill="#FFAAA6" stroke="#3A2E2B" strokeWidth="3.5" strokeLinejoin="round" />
    <path d="M75 40 L82 15 L60 30 Z" fill="#FFAAA6" stroke="#3A2E2B" strokeWidth="3.5" strokeLinejoin="round" />
    <path d="M26 35 L22 20 L36 28 Z" fill="#FFD3B6" />
    <path d="M74 35 L78 20 L64 28 Z" fill="#FFD3B6" />
    
    <ellipse cx="50" cy="52" rx="36" ry="30" fill="#FFFBF0" stroke="#3A2E2B" strokeWidth="3.5" />
    
    <circle cx="30" cy="58" r="6" fill="#FFB7B2" opacity="0.75" />
    <circle cx="70" cy="58" r="6" fill="#FFB7B2" opacity="0.75" />

    {mood === "happy" ? (
      <>
        <path d="M32 50 Q 38 43 42 50" stroke="#3A2E2B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M58 50 Q 62 43 68 50" stroke="#3A2E2B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      </>
    ) : (
      <>
        <circle cx="36" cy="48" r="4" fill="#3A2E2B" />
        <path d="M58 50 Q 62 43 68 50" stroke="#3A2E2B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      </>
    )}

    <path d="M48 55 L52 55 L50 58 Z" fill="#FF8DA1" stroke="#3A2E2B" strokeWidth="1.5" />
    <path d="M50 58 Q 45 64 42 61" stroke="#3A2E2B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M50 58 Q 55 64 58 61" stroke="#3A2E2B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

    <path d="M15 50 L26 52" stroke="#3A2E2B" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M14 58 L26 57" stroke="#3A2E2B" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M74 52 L85 50" stroke="#3A2E2B" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M74 57 L86 58" stroke="#3A2E2B" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Hand-Drawn Dog SVG
export const DogIllustration = ({ size = 80, mood = "happy", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M18 35 C10 45, 12 70, 24 62 C28 58, 26 40, 24 35 Z" fill="#D4A373" stroke="#3A2E2B" strokeWidth="3.5" />
    <path d="M82 35 C90 45, 88 70, 76 62 C72 58, 74 40, 76 35 Z" fill="#D4A373" stroke="#3A2E2B" strokeWidth="3.5" />

    <ellipse cx="50" cy="50" rx="34" ry="28" fill="#FFF9ED" stroke="#3A2E2B" strokeWidth="3.5" />
    <ellipse cx="50" cy="58" rx="16" ry="12" fill="#FFFFFF" stroke="#3A2E2B" strokeWidth="2" />

    <circle cx="28" cy="54" r="5" fill="#FFB7B2" opacity="0.75" />
    <circle cx="72" cy="54" r="5" fill="#FFB7B2" opacity="0.75" />

    <path d="M34 46 Q 40 40 44 46" stroke="#3A2E2B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <path d="M56 46 Q 60 40 66 46" stroke="#3A2E2B" strokeWidth="3.5" strokeLinecap="round" fill="none" />

    <ellipse cx="50" cy="55" rx="5" ry="4" fill="#3A2E2B" />
    <path d="M50 59 V 63" stroke="#3A2E2B" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M47 63 C47 68, 53 68, 53 63 Z" fill="#FF7B9C" stroke="#3A2E2B" strokeWidth="2" />
  </svg>
);

// Hand-Drawn Bunny SVG
export const BunnyIllustration = ({ size = 70, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Ears */}
    <ellipse cx="38" cy="22" rx="7" ry="20" fill="#FFFFFF" stroke="#3A2E2B" strokeWidth="3.5" />
    <ellipse cx="62" cy="22" rx="7" ry="20" fill="#FFFFFF" stroke="#3A2E2B" strokeWidth="3.5" />
    <ellipse cx="38" cy="22" rx="4" ry="14" fill="#FFD1DC" />
    <ellipse cx="62" cy="22" rx="4" ry="14" fill="#FFD1DC" />
    
    {/* Head */}
    <circle cx="50" cy="58" r="30" fill="#FFFDF7" stroke="#3A2E2B" strokeWidth="3.5" />
    <circle cx="36" cy="62" r="5" fill="#FFB7B2" opacity="0.75" />
    <circle cx="64" cy="62" r="5" fill="#FFB7B2" opacity="0.75" />

    {/* Eyes & Nose */}
    <circle cx="38" cy="54" r="3.5" fill="#3A2E2B" />
    <circle cx="62" cy="54" r="3.5" fill="#3A2E2B" />
    <ellipse cx="50" cy="60" rx="3" ry="2" fill="#FF8DA1" stroke="#3A2E2B" strokeWidth="1" />
  </svg>
);

// Hand-Drawn Capybara SVG
export const CapybaraIllustration = ({ size = 70, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="20" y="30" width="60" height="50" rx="20" fill="#B08968" stroke="#3A2E2B" strokeWidth="3.5" />
    <ellipse cx="72" cy="35" rx="5" ry="4" fill="#7F5539" stroke="#3A2E2B" strokeWidth="2" />
    <rect x="22" y="45" width="22" height="20" rx="8" fill="#7F5539" stroke="#3A2E2B" strokeWidth="2" />
    <circle cx="28" cy="52" r="2.5" fill="#3A2E2B" />
    <path d="M52 44 Q 56 40 60 44" stroke="#3A2E2B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <circle cx="45" cy="26" r="8" fill="#FFF5BA" stroke="#3A2E2B" strokeWidth="2.5" />
  </svg>
);

// Sparkle Star SVG (Drawn on paper)
export const SparkleIllustration = ({ size = 24, className = "", color = "#FFD700" }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M25 0 C25 15, 35 25, 50 25 C35 25, 25 35, 25 50 C25 35, 15 25, 0 25 C15 25, 25 15, 25 0Z"
      fill={color}
      stroke="#3A2E2B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

// Hand-Drawn Heart SVG with paper stroke & sketch line
export const HeartIllustration = ({ size = 32, className = "", color = "#FF7B9C" }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M25 43 C25 43, 6 30, 6 17 C6 9.5 12 5 18 5 C22.5 5 25 8.5 25 8.5 C25 8.5 27.5 5 32 5 C38 5 44 9.5 44 17 C44 30, 25 43, 25 43Z"
      fill={color}
      stroke="#3A2E2B"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M 16 14 Q 22 20 28 14"
      stroke="#3A2E2B"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

// Hand-Drawn Ribbon SVG
export const RibbonIllustration = ({ size = 50, className = "" }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M30 35 L10 55 L25 52 L35 40 Z" fill="#C7CEEA" stroke="#3A2E2B" strokeWidth="2.5" />
    <path d="M70 35 L90 55 L75 52 L65 40 Z" fill="#C7CEEA" stroke="#3A2E2B" strokeWidth="2.5" />
    <path d="M50 25 C30 10, 10 20, 30 35 C40 35, 48 30, 50 25 Z" fill="#E8DFF5" stroke="#3A2E2B" strokeWidth="2.5" />
    <path d="M50 25 C70 10, 90 20, 70 35 C60 35, 52 30, 50 25 Z" fill="#E8DFF5" stroke="#3A2E2B" strokeWidth="2.5" />
    <ellipse cx="50" cy="26" rx="8" ry="7" fill="#FFB7C5" stroke="#3A2E2B" strokeWidth="2.5" />
  </svg>
);
