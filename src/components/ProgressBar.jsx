import React from 'react';
import { motion } from 'framer-motion';
import { DrawnHeart } from './DrawnHeart';

export const ProgressBar = ({ currentStep, totalSteps }) => {
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div style={{ width: '100%', maxWidth: '520px', margin: '0 auto 12px auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '6px',
        fontWeight: '700',
        color: 'var(--sketch-dark)',
        fontFamily: 'var(--font-sketch)',
        fontSize: '1.05rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>🌸</span>
          <span>Question {currentStep} / {totalSteps}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <DrawnHeart size={18} color="#FF5E85" fillColor="#FFB7C5" duration={0.6} />
          <span style={{ fontSize: '0.95rem', color: 'var(--deep-pink)', fontWeight: '700' }}>
            {Math.round(progressPercent)}% Drawn
          </span>
        </div>
      </div>

      {/* Paper Progress Track */}
      <div style={{
        height: '14px',
        width: '100%',
        backgroundColor: '#FFFDF8',
        border: '2px solid #3A2E2B',
        borderRadius: '16px',
        padding: '2px',
        boxShadow: '0 2px 6px rgba(58, 46, 43, 0.08)',
        position: 'relative'
      }}>
        {/* Animated Filled Pencil/Crayon Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #FFB7C5 0%, #FF5E85 100%)',
            borderRadius: '16px',
            position: 'relative'
          }}
        >
          {/* Drawn Heart icon at tip of progress bar */}
          <div style={{
            position: 'absolute',
            right: '-10px',
            top: '-7px'
          }}>
            <DrawnHeart size={22} color="#FF5E85" fillColor="#FFB7C5" duration={0.5} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
