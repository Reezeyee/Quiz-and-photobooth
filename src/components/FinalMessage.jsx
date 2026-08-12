import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { DrawnHeart } from './DrawnHeart';
import { FlowerIllustration, CatIllustration, DogIllustration, BunnyIllustration } from '../assets/illustrations';
import { RotateCcw, Download } from 'lucide-react';

const ROMANTIC_QUOTES = [
  { text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.", author: "Maya Angelou" },
  { text: "Whatever our souls are made of, yours and mine are the same.", author: "Emily Brontë" },
  { text: "If I had a flower for every time I thought of you, I could walk through my garden forever.", author: "Alfred Tennyson" },
  { text: "You are my sun, my moon, and all my stars.", author: "E.E. Cummings" },
  { text: "To love and be loved is to feel the sun from both sides.", author: "David Viscott" },
  { text: "My heart is, and always will be, yours.", author: "Jane Austen" },
  { text: "You are the finest, loveliest, tenderest, and most beautiful person I have ever known.", author: "F. Scott Fitzgerald" },
  { text: "I love you not only for what you are, but for what I am when I am with you.", author: "Roy Croft" },
  { text: "You have bewitched me body and soul, and I love, I love, I love you.", author: "Jane Austen" },
  { text: "I swear I couldn't love you more than I do right now, and yet I know I will tomorrow.", author: "Leo Christopher" },
  { text: "When I look at you, I see the rest of my life in front of my eyes.", author: "Unknown" },
  { text: "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.", author: "Angelita Lim" },
  { text: "You are my today and all of my tomorrows.", author: "Leo Christopher" },
  { text: "Every love story is beautiful, but ours is my absolute favorite.", author: "Anonymous" },
  { text: "You make my heart smile in a way nobody else can.", author: "Anonymous" }
];

export const FinalMessage = ({ photostripData, onRestartQuiz }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * ROMANTIC_QUOTES.length));
  const currentQuote = ROMANTIC_QUOTES[quoteIndex];

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % ROMANTIC_QUOTES.length);
  };

  useEffect(() => {
    // Launch celebratory confetti burst
    const end = Date.now() + 2 * 1000;
    const colors = ['#74B9FF', '#A29BFE', '#55EFC4', '#FF5E85', '#FFF275'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  // Download Photostrip to local device (Standard 2x6 inches @ 300 DPI = 600x1800 px)
  const handleDownloadPhotostrip = () => {
    const photos = photostripData?.photos || [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80'
    ];

    setIsDownloading(true);
    const canvas = document.createElement('canvas');
    // Standard 2" x 6" Photobooth Strip at 300 DPI
    const width = 600;
    const height = 1800;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const layoutId = photostripData?.layoutId || 'standardWhite';
    const isBlack = layoutId === 'standardBlack';
    const isPastel = layoutId === 'pastel';
    const isClassic = layoutId === 'classic';
    const isScrapbook = layoutId === 'scrapbook';
    const isAnimal = layoutId === 'animal';
    const isFlower = layoutId === 'flowerGarden';
    const isRandom = layoutId === 'random';

    // Background styling per theme
    if (isBlack) {
      ctx.fillStyle = '#121212';
    } else if (isPastel) {
      ctx.fillStyle = '#FFF5FA';
    } else if (isClassic) {
      ctx.fillStyle = '#FFFDF8';
    } else if (isScrapbook) {
      ctx.fillStyle = '#F5EBE0';
    } else if (isAnimal) {
      ctx.fillStyle = '#F0FAF4';
    } else if (isFlower) {
      ctx.fillStyle = '#FFF0F5';
    } else if (isRandom) {
      ctx.fillStyle = '#F4F0FF';
    } else {
      ctx.fillStyle = '#FFFFFF';
    }
    ctx.fillRect(0, 0, width, height);

    // Notebook lines for Classic layout
    if (isClassic) {
      ctx.strokeStyle = 'rgba(232, 223, 245, 0.6)';
      ctx.lineWidth = 2;
      for (let y = 40; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.strokeStyle = '#FF8DA1';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(50, 0);
      ctx.lineTo(50, height);
      ctx.stroke();
    }

    // 35mm Sprocket holes for Black layout
    if (isBlack) {
      ctx.fillStyle = '#262626';
      for (let y = 30; y < height - 30; y += 75) {
        // Left sprockets
        ctx.fillRect(16, y, 16, 28);
        // Right sprockets
        ctx.fillRect(width - 32, y, 16, 28);
      }
    }

    // Strip Outer Border
    if (isBlack) {
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 12;
      ctx.strokeRect(6, 6, width - 12, height - 12);
    } else if (isScrapbook) {
      ctx.strokeStyle = '#4A3B32';
      ctx.lineWidth = 12;
      ctx.strokeRect(8, 8, width - 16, height - 16);
    } else if (isFlower) {
      ctx.strokeStyle = '#E88D94';
      ctx.lineWidth = 14;
      ctx.strokeRect(7, 7, width - 14, height - 14);
    } else if (isRandom) {
      ctx.strokeStyle = '#7C5CBF';
      ctx.lineWidth = 14;
      ctx.strokeRect(7, 7, width - 14, height - 14);
    } else if (isClassic || isPastel) {
      ctx.strokeStyle = '#3A2E2B';
      ctx.lineWidth = 14;
      ctx.strokeRect(7, 7, width - 14, height - 14);
    } else {
      ctx.strokeStyle = '#E0E0E0';
      ctx.lineWidth = 10;
      ctx.strokeRect(5, 5, width - 10, height - 10);
    }

    let loadedCount = 0;
    const loadedImages = [];

    photos.forEach((src, idx) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        loadedImages[idx] = img;
        loadedCount++;

        if (loadedCount === photos.length) {
          // Standard 4:3 photo ratio (500px wide by 375px high)
          const photoW = 500;
          const photoH = 375;
          const startX = (width - photoW) / 2;
          const startYMargin = 90;
          const gapY = 40;

          loadedImages.forEach((image, i) => {
            const startY = startYMargin + i * (photoH + gapY);
            ctx.filter = photostripData?.filterCss || 'none';
            ctx.drawImage(image, startX, startY, photoW, photoH);
            ctx.filter = 'none';

            // Washi tape accent for scrapbook
            if (isScrapbook) {
              ctx.fillStyle = 'rgba(255, 209, 220, 0.9)';
              ctx.fillRect(startX + photoW - 70, startY - 14, 80, 24);
              ctx.strokeStyle = '#3A2E2B';
              ctx.lineWidth = 2;
              ctx.strokeRect(startX + photoW - 70, startY - 14, 80, 24);
            }

            // Individual photo frame border
            if (isBlack) {
              ctx.strokeStyle = '#FFFFFF';
              ctx.lineWidth = 6;
            } else if (isScrapbook) {
              ctx.strokeStyle = '#4A3B32';
              ctx.lineWidth = 6;
            } else if (isFlower) {
              ctx.strokeStyle = '#E88D94';
              ctx.lineWidth = 6;
            } else if (isRandom) {
              ctx.strokeStyle = '#7C5CBF';
              ctx.lineWidth = 6;
            } else if (isClassic || isPastel || isAnimal) {
              ctx.strokeStyle = '#3A2E2B';
              ctx.lineWidth = 6;
            } else {
              ctx.strokeStyle = '#DDDDDD';
              ctx.lineWidth = 4;
            }
            ctx.strokeRect(startX, startY, photoW, photoH);
          });

          // Text branding at bottom footer (2x6 inch photostrip layout)
          const footerY = 1530;
          ctx.fillStyle = isBlack ? '#FFFFFF' : (isScrapbook ? '#4A3B32' : (isFlower ? '#E88D94' : (isRandom ? '#7C5CBF' : '#3A2E2B')));
          ctx.font = 'bold 36px "Fredoka", sans-serif';
          ctx.textAlign = 'center';

          let mainTitle = 'BEST MEMORIES 💗';
          if (isBlack) mainTitle = '35MM RETRO FILM 🎞️';
          if (isScrapbook) mainTitle = 'CRAFT SCRAPBOOK 🎨';
          if (isAnimal) mainTitle = 'PAW-FECT MOMENTS 🐱🐶';
          if (isFlower) mainTitle = 'GARDEN MEMORIES 💐';
          if (isPastel) mainTitle = 'SWEETEST SMILES 🌸';
          if (isRandom) mainTitle = 'SURPRISE PHOTOSTRIP ✨';

          ctx.fillText(mainTitle, width / 2, footerY);

          ctx.font = '500 24px sans-serif';
          ctx.fillStyle = isBlack ? '#AAAAAA' : '#FF5E85';
          ctx.fillText(new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }), width / 2, footerY + 50);

          ctx.font = '600 18px sans-serif';
          ctx.fillStyle = isBlack ? '#777777' : '#8A7B77';
          ctx.fillText('2" × 6" Standard Photobooth Strip • 300 DPI', width / 2, footerY + 95);

          const link = document.createElement('a');
          link.download = `photostrip_2x6in_${Date.now()}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
          setIsDownloading(false);
          confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === photos.length) setIsDownloading(false);
      };
      img.src = src;
    });
  };

  const samplePhotos = photostripData?.photos || [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80'
  ];

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
      <motion.div
        className="paper-card theme-lavender"
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          maxWidth: '520px',
          width: '100%',
          padding: '28px 20px 20px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          boxShadow: 'var(--shadow-paper)'
        }}
      >
        <div className="paper-tape-top" />

        {/* Pets, Flowers & Drawn Hearts Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', zIndex: 3 }}>
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <CatIllustration size={45} mood="happy" />
          </motion.div>

          <DrawnHeart size={32} color="#FF5E85" fillColor="#FFB7C5" duration={1.2} />

          <motion.div animate={{ scale: [1, 1.12, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
            <FlowerIllustration size={50} color="#A29BFE" />
          </motion.div>

          <DrawnHeart size={32} color="#A29BFE" fillColor="#E8DFF5" duration={1.4} delay={0.2} />

          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}>
            <DogIllustration size={45} mood="happy" />
          </motion.div>

          <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 2.8, repeat: Infinity }}>
            <BunnyIllustration size={36} />
          </motion.div>
        </div>

        {/* Random Romantic Quote Section */}
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            zIndex: 3,
            backgroundColor: '#FFFDF8',
            border: '2.5px dashed #FF7B9C',
            borderRadius: '16px',
            padding: '16px 20px',
            position: 'relative',
            width: '100%',
            maxWidth: '440px',
            boxShadow: '0 4px 12px rgba(255, 123, 156, 0.12)'
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <DrawnHeart size={24} color="#FF5E85" fillColor="#FFB7C5" duration={0.8} />
            <span style={{ fontFamily: 'var(--font-sketch)', fontWeight: '700', color: 'var(--deep-pink)', fontSize: '1rem', letterSpacing: '0.5px' }}>
              A Note For You 💖
            </span>
          </div>

          <p className="text-script" style={{ fontSize: '1.75rem', margin: '4px 0', color: '#3A2E2B', lineHeight: 1.35 }}>
            "{currentQuote.text}"
          </p>

          {currentQuote.author && (
            <p style={{ fontFamily: 'var(--font-sketch)', fontWeight: '600', color: '#8A7B77', fontSize: '0.95rem', margin: 0 }}>
              — {currentQuote.author}
            </p>
          )}

          <motion.button
            onClick={handleNextQuote}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              marginTop: '4px',
              background: 'transparent',
              border: 'none',
              color: 'var(--deep-pink)',
              fontFamily: 'var(--font-sketch)',
              fontWeight: '700',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              textDecoration: 'underline'
            }}
          >
            <span>Read another quote ✨</span>
          </motion.button>
        </motion.div>

        {/* COMPLETED PHOTOSTRIP DISPLAY AT THE END (Scaled to 2" x 6" Photostrip 1:3 Aspect Ratio) */}
        <div style={{
          width: '100%',
          maxWidth: '220px',
          aspectRatio: '1 / 3',
          backgroundColor: photostripData?.layoutId === 'standardBlack' ? '#181818' : photostripData?.layoutId === 'pastel' ? '#FFF5FA' : '#FFFDF8',
          border: '3px solid #3A2E2B',
          borderRadius: '16px',
          padding: '16px 12px 14px 12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 8px 24px rgba(58, 46, 43, 0.16)',
          position: 'relative',
          zIndex: 3
        }}>
          <div className="paper-tape-top" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
            {samplePhotos.map((img, idx) => (
              <div key={idx} style={{ width: '100%', aspectRatio: '4 / 3', borderRadius: '6px', overflow: 'hidden', border: photostripData?.layoutId === 'standardBlack' ? '2px solid #FFFFFF' : '2px solid #3A2E2B' }}>
                <img
                  src={img}
                  alt={`Photostrip shot ${idx + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    filter: photostripData?.filterCss || 'none'
                  }}
                />
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <DrawnHeart size={18} color="#FF5E85" fillColor="#FFB7C5" duration={0.8} />
              <span style={{
                fontFamily: 'var(--font-sketch)',
                fontWeight: '700',
                fontSize: '0.9rem',
                color: photostripData?.layoutId === 'standardBlack' ? '#FFFFFF' : '#3A2E2B'
              }}>
                Best Memories 💗
              </span>
            </div>
            <span style={{ fontSize: '0.7rem', color: photostripData?.layoutId === 'standardBlack' ? '#AAAAAA' : '#8A7B77', fontWeight: '600' }}>
              2" × 6" Strip (600×1800 px @ 300 DPI)
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', zIndex: 3 }}>
          <motion.button
            onClick={handleDownloadPhotostrip}
            disabled={isDownloading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '12px 28px',
              fontSize: '1.1rem',
              fontWeight: '700',
              fontFamily: 'var(--font-sketch)',
              color: '#FFFFFF',
              background: 'linear-gradient(135deg, #FF7B9C 0%, #FFB7C5 100%)',
              borderRadius: '32px',
              border: '3px solid #3A2E2B',
              boxShadow: '0 6px 18px rgba(58, 46, 43, 0.16)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <Download size={18} />
            <span>{isDownloading ? 'Exporting...' : 'Download Photostrip 📥'}</span>
          </motion.button>

          <motion.button
            onClick={onRestartQuiz}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            style={{
              padding: '12px 24px',
              fontSize: '1.05rem',
              fontWeight: '700',
              fontFamily: 'var(--font-sketch)',
              color: 'var(--sketch-dark)',
              backgroundColor: '#FFFDF8',
              borderRadius: '32px',
              border: '2.5px solid #3A2E2B',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={16} />
            <span>Take Again 📖</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
