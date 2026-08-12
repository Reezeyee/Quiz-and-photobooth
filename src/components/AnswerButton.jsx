import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DrawnHeart } from './DrawnHeart';

export const AnswerButton = ({
  answerText,
  isSelected,
  isAnswered,
  onSelect,
  themeColor = "pink"
}) => {
  const [isHovered, setIsHovered] = useState(false);

  let backgroundColor = '#FFFDF8';
  let borderColor = '#3A2E2B';
  let textColor = 'var(--sketch-dark)';
  let scaleFactor = 1;

  if (isAnswered && isSelected) {
    backgroundColor = '#F0FDF4';
    borderColor = '#3A2E2B';
    textColor = '#1B5E20';
    scaleFactor = 1.02;
  }

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAnswered && onSelect) {
      onSelect(answerText);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={isAnswered}
      whileHover={!isAnswered ? { scale: 1.015, backgroundColor: '#FFF9EE' } : {}}
      whileTap={!isAnswered ? { scale: 0.97 } : {}}
      animate={{ scale: scaleFactor }}
      transition={{ duration: 0.2 }}
      className={`paper-answer-btn ${isSelected ? 'selected' : ''}`}
      style={{
        width: '100%',
        padding: '11px 18px',
        fontSize: '1.08rem',
        fontWeight: '600',
        color: textColor,
        backgroundColor: backgroundColor,
        border: `2.5px solid ${borderColor}`,
        borderRadius: '16px 14px 18px 14px',
        boxShadow: '0 4px 10px rgba(58, 46, 43, 0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: isAnswered ? 'default' : 'pointer',
        position: 'relative',
        overflow: 'visible'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Hand-Drawn Heart Marker Bullet */}
        <DrawnHeart
          size={18}
          color={isSelected ? "#FF5E85" : isHovered ? "#FF7B9C" : "#A29BFE"}
          fillColor={isSelected ? "#FFB7C5" : isHovered ? "#FFE5EC" : "transparent"}
          animateOnMount={false}
          duration={0.6}
        />
        <span style={{ textAlign: 'left', fontFamily: 'var(--font-sketch)', fontSize: '1.08rem' }}>
          {answerText}
        </span>
      </div>

      {/* Selected Drawing Heart Animated Indicator */}
      {isAnswered && isSelected && (
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1.1, rotate: 0 }}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <DrawnHeart size={26} color="#FF5E85" fillColor="#FFB7C5" duration={0.8} />
        </motion.div>
      )}

      {/* Hover Pencil Doodle Indicator */}
      {!isAnswered && isHovered && !isSelected && (
        <motion.span
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ fontSize: '0.9rem', color: '#FF7B9C' }}
        >
          ✏️
        </motion.span>
      )}
    </motion.button>
  );
};
