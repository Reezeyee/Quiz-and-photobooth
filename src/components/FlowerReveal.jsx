import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { getRandomFlowerResult } from '../data/questions';
import { DrawnHeart } from './DrawnHeart';
import { DrawnFlowerAnimation } from './DrawnFlowerAnimation';
import { SparkleIllustration, PetalIllustration, CatIllustration, DogIllustration } from '../assets/illustrations';

export const FlowerReveal = ({ onProceedToPhotobooth }) => {
  const [phase, setPhase] = useState('suspense'); // 'suspense' -> 'blooming' -> 'revealed'

  // Pick a random flower result for this run
  const flowerResult = useMemo(() => getRandomFlowerResult(), []);

  useEffect(() => {
    // Launch background suspense confetti
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });

    // Stage 1: Suspense & Paper Sketching (3.2 seconds)
    const timer1 = setTimeout(() => {
      setPhase('blooming');
    }, 3200);

    // Stage 2: Blooming & Reveal (2.5 seconds later)
    const timer2 = setTimeout(() => {
      setPhase('revealed');
      confetti({ particleCount: 80, spread: 100, origin: { y: 0.5 } });
    }, 5700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px 12px',
      position: 'relative',
      zIndex: 1,
      textAlign: 'center'
    }}>
      <AnimatePresence mode="wait">
        {/* PHASE 1: SUSPENSE ANIMATION ON PAPER */}
        {phase === 'suspense' && (
          <motion.div
            key="suspense"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="paper-card theme-lavender"
            style={{
              padding: '32px 22px',
              maxWidth: '500px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '18px'
            }}
          >
            <div className="paper-tape-top" />

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <CatIllustration size={45} mood="wink" />
              <DrawnHeart size={36} color="#FF5E85" fillColor="#FFB7C5" duration={1.2} />
              <DogIllustration size={45} mood="happy" />
            </div>

            <h2 className="heading-primary" style={{ fontSize: '1.6rem', lineHeight: 1.3 }}>
              Okay... let's see what your answers say about you 👀
            </h2>

            <p style={{ color: 'var(--sketch-muted)', fontFamily: 'var(--font-sketch)', fontWeight: 600, fontSize: '1.15rem' }}>
              Drawing your special bloom petal by petal... ✏️🌸
            </p>

            {/* Glowing Petal Ring */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -8, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                >
                  <PetalIllustration size={28} color={['#74B9FF', '#A29BFE', '#FF7B9C', '#E2F0CB', '#FFF275'][i]} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* PHASE 2 & 3: BLOOMING & HAND-DRAWN FLOWER REVEAL ON PAPER */}
        {(phase === 'blooming' || phase === 'revealed') && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="paper-card theme-mint"
            style={{
              padding: '28px 20px 22px 20px',
              maxWidth: '520px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
              boxShadow: 'var(--shadow-paper)'
            }}
          >
            <div className="paper-tape-top" />

            <motion.h3
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontFamily: 'var(--font-sketch)',
                color: 'var(--sketch-dark)',
                fontSize: '1.4rem'
              }}
            >
              Drawing your flower... ✏️🌸
            </motion.h3>

            {/* LIVE HAND-DRAWING FLOWER ANIMATION */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              margin: '4px 0'
            }}>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: phase === 'revealed' ? 1.2 : 0.6, opacity: 1 }}
                transition={{ duration: 0.8 }}
                style={{ position: 'absolute', top: '-6px' }}
              >
                <div style={{ display: 'flex', gap: '35px', alignItems: 'center' }}>
                  <DrawnHeart size={28} color="#FF7B9C" fillColor="#FFB7C5" duration={0.8} />
                  <SparkleIllustration size={30} color="#74B9FF" />
                  <DrawnHeart size={28} color="#A29BFE" fillColor="#E8DFF5" duration={0.8} />
                </div>
              </motion.div>

              <DrawnFlowerAnimation
                size={130}
                color={flowerResult.color}
                centerColor={flowerResult.centerColor}
                duration={2}
                isRevealed={phase === 'revealed'}
              />
            </div>

            {/* Result Details & Random Message */}
            {phase === 'revealed' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <h1 className="heading-primary" style={{ fontSize: '1.8rem' }}>
                  {flowerResult.name} {flowerResult.emoji}
                </h1>

                <span style={{
                  backgroundColor: '#E8DFF5',
                  color: '#3A2E2B',
                  border: '2px solid #3A2E2B',
                  fontFamily: 'var(--font-sketch)',
                  fontWeight: '700',
                  padding: '4px 14px',
                  borderRadius: '16px',
                  fontSize: '0.95rem'
                }}>
                  {flowerResult.tagline}
                </span>

                <p style={{
                  color: 'var(--sketch-dark)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.4,
                  fontWeight: 600,
                  fontSize: '1rem',
                  maxWidth: '420px'
                }}>
                  {flowerResult.description}
                </p>

                <p style={{
                  color: '#FF5E85',
                  fontFamily: 'var(--font-sketch)',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  backgroundColor: '#FFF9EE',
                  padding: '8px 14px',
                  borderRadius: '14px',
                  border: '2px dashed #3A2E2B',
                  maxWidth: '420px'
                }}>
                  ✨ Meaning: {flowerResult.meaning}
                </p>

                {/* Transition to Photobooth Button */}
                <motion.button
                  onClick={onProceedToPhotobooth}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    marginTop: '8px',
                    padding: '13px 32px',
                    fontSize: '1.18rem',
                    fontWeight: '700',
                    color: '#FFFFFF',
                    background: 'linear-gradient(135deg, #74B9FF 0%, #A29BFE 100%)',
                    borderRadius: '35px',
                    border: '3px solid #3A2E2B',
                    boxShadow: '0 6px 18px rgba(58, 46, 43, 0.16)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span>See Photobooth Memories 📸✨</span>
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
