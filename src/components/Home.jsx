import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DrawnHeart } from './DrawnHeart';
import { FlowerIllustration, CatIllustration, DogIllustration, BunnyIllustration, CapybaraIllustration, SparkleIllustration } from '../assets/illustrations';

export const Home = ({ onStartQuiz }) => {
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    setIsStarting(true);
    setTimeout(() => {
      onStartQuiz();
    }, 1200);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '85vh',
      padding: '16px 12px',
      textAlign: 'center',
      position: 'relative',
      zIndex: 1
    }}>
      <motion.div
        className="paper-card theme-lavender"
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          maxWidth: '520px',
          width: '100%',
          padding: '32px 24px 28px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '18px',
          boxShadow: 'var(--shadow-paper)'
        }}
      >
        {/* Paper Tape Accents */}
        <div className="paper-tape-top" />
        <div className="paper-tape-left" />
        <div className="paper-tape-right" />

        {/* Animated Cute Animals & Drawn Hearts Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', zIndex: 3 }}>
          <motion.div animate={{ rotate: [-6, 6, -6] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            <CatIllustration size={50} mood="happy" />
          </motion.div>

          <DrawnHeart size={34} color="#FF5E85" fillColor="#FFB7C5" duration={1.4} delay={0.1} />

          <motion.div animate={{ scale: [1, 1.12, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
            <FlowerIllustration size={55} color="#FFB7C5" />
          </motion.div>

          <DrawnHeart size={34} color="#A29BFE" fillColor="#E8DFF5" duration={1.6} delay={0.3} />

          <motion.div animate={{ rotate: [6, -6, 6] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}>
            <DogIllustration size={50} mood="happy" />
          </motion.div>
        </div>

        {/* Title & Subtitle */}
        <motion.div style={{ display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 3 }}>
          <h1 className="heading-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '2.1rem' }}>
            <span>A Little Quiz</span>
            <span>About Us</span>
            <DrawnHeart size={36} color="#FF5E85" fillColor="#FF7B9C" duration={1} />
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--sketch-muted)',
            fontFamily: 'var(--font-sketch)',
            fontWeight: 600
          }}>
            Drawn on paper with sweet memories! ✨
          </p>
        </motion.div>

        {/* Paper Drawn Start Button */}
        <motion.button
          onClick={handleStart}
          disabled={isStarting}
          whileHover={{ scale: 1.06, rotate: -1 }}
          whileTap={{ scale: 0.94 }}
          style={{
            marginTop: '8px',
            padding: '14px 36px',
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#FFFFFF',
            background: 'linear-gradient(135deg, #74B9FF 0%, #A29BFE 50%, #FF7B9C 100%)',
            borderRadius: '40px',
            border: '3px solid #3A2E2B',
            boxShadow: '0 6px 20px rgba(58, 46, 43, 0.16)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 3
          }}
        >
          <span>Open Notebook & Start ✨</span>
        </motion.button>
      </motion.div>

      {/* Start Transition Paper Overlay */}
      <AnimatePresence>
        {isStarting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#FFF9ED',
              backgroundImage: 'linear-gradient(rgba(255, 123, 156, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(180, 195, 232, 0.2) 1px, transparent 1px)',
              backgroundSize: '100% 28px, 28px 100%',
              zIndex: 99
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <FlowerIllustration size={70} color="#74B9FF" />
                <DrawnHeart size={65} color="#FF5E85" fillColor="#FFB7C5" duration={0.8} />
                <FlowerIllustration size={70} color="#A29BFE" />
              </div>
              <h2 className="heading-primary">
                Drawing memory pages... 📖💗
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
