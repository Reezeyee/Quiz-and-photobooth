import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { DrawnHeart } from './DrawnHeart';
import { PetalIllustration, SparkleIllustration, CatIllustration, DogIllustration, BunnyIllustration } from '../assets/illustrations';

export const CuteBackground = () => {
  // Generate stable random items for floating paper particles & drawn hearts
  const floatingItems = useMemo(() => {
    return Array.from({ length: 16 }).map((_, index) => ({
      id: index,
      x: (index * 6.2 + Math.random() * 4) % 94 + 3, // evenly spaced percentage x-position
      delay: Math.random() * 6,
      duration: 12 + Math.random() * 10,
      scale: 0.65 + Math.random() * 0.5,
      type: index % 4 === 0 ? 'drawnHeart' : index % 4 === 1 ? 'petal' : index % 4 === 2 ? 'sparkle' : 'doodleHeart'
    }));
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {/* Paper Desk Background Grid Lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.45,
        backgroundImage: 'radial-gradient(rgba(58, 46, 43, 0.15) 1px, transparent 1.5px)',
        backgroundSize: '32px 32px'
      }} />

      {/* Floating Paper Drawn Particles (Hearts, Petals, Pencil Sparkles) */}
      {floatingItems.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: '108vh', x: `${item.x}vw`, opacity: 0, rotate: -15 }}
          animate={{
            y: '-12vh',
            opacity: [0, 0.85, 0.85, 0],
            rotate: [0, 20, -20, 360],
            x: [`${item.x}vw`, `${item.x + (item.id % 2 === 0 ? 4 : -4)}vw`]
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: 'linear'
          }}
          style={{ position: 'absolute', transformOrigin: 'center' }}
        >
          {item.type === 'drawnHeart' && (
            <DrawnHeart
              size={34 * item.scale}
              color="#FF5E85"
              fillColor="#FFB7C5"
              animateOnMount={false}
              duration={1.5}
            />
          )}

          {item.type === 'doodleHeart' && (
            <DrawnHeart
              size={28 * item.scale}
              color="#A29BFE"
              fillColor="#E8DFF5"
              animateOnMount={false}
              duration={1.8}
            />
          )}

          {item.type === 'petal' && (
            <PetalIllustration size={32 * item.scale} color="#FFB7C5" />
          )}

          {item.type === 'sparkle' && (
            <SparkleIllustration size={24 * item.scale} color="#FFD700" />
          )}
        </motion.div>
      ))}

      {/* Hand-Drawn Paper Flowers & Petals in Corners */}
      <motion.div
        animate={{ rotate: [0, 4, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: 12, left: 14, opacity: 0.9, zIndex: 2 }}
      >
        <div style={{
          backgroundColor: '#FFFDF8',
          padding: '6px 12px',
          border: '2.5px solid #3A2E2B',
          borderRadius: '12px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transform: 'rotate(-6deg)'
        }}>
          <span style={{ fontSize: '1.4rem' }}>🌸</span>
          <span style={{ fontFamily: 'var(--font-sketch)', fontWeight: 700, fontSize: '0.85rem', color: '#FF5E85' }}>
            Notebook Entry 📖
          </span>
        </div>
      </motion.div>

      <motion.div
        animate={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: 12, right: 14, opacity: 0.9, zIndex: 2 }}
      >
        <div style={{
          backgroundColor: '#FFFDF8',
          padding: '6px 12px',
          border: '2.5px solid #3A2E2B',
          borderRadius: '12px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transform: 'rotate(6deg)'
        }}>
          <span style={{ fontSize: '1.4rem' }}>🌺</span>
          <span style={{ fontFamily: 'var(--font-sketch)', fontWeight: 700, fontSize: '0.85rem', color: '#74B9FF' }}>
            Drawn with Love 💗
          </span>
        </div>
      </motion.div>

      {/* Cute Animals Peeking on Paper */}
      <motion.div
        initial={{ y: 80 }}
        animate={{ y: [80, 20, 20, 80] }}
        transition={{ duration: 12, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: 0, left: '5%', opacity: 0.95 }}
      >
        <CatIllustration size={75} mood="happy" />
      </motion.div>

      <motion.div
        initial={{ y: 80 }}
        animate={{ y: [80, 25, 25, 80] }}
        transition={{ duration: 14, repeat: Infinity, repeatDelay: 8, ease: 'easeInOut', delay: 4 }}
        style={{ position: 'absolute', bottom: 0, right: '5%', opacity: 0.95 }}
      >
        <DogIllustration size={75} mood="happy" />
      </motion.div>

      <motion.div
        initial={{ y: 70 }}
        animate={{ y: [70, 15, 15, 70] }}
        transition={{ duration: 15, repeat: Infinity, repeatDelay: 10, ease: 'easeInOut', delay: 2 }}
        style={{ position: 'absolute', bottom: 0, left: '46%', transform: 'translateX(-50%)', opacity: 0.9 }}
      >
        <BunnyIllustration size={65} />
      </motion.div>
    </div>
  );
};
