import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CameraPhotobooth } from './CameraPhotobooth';
import { DrawnHeart } from './DrawnHeart';
import { CatIllustration, DogIllustration, FlowerIllustration, SparkleIllustration, RibbonIllustration, BunnyIllustration, CapybaraIllustration } from '../assets/illustrations';
import { RefreshCw, Sliders } from 'lucide-react';

export const PhotoBooth = ({ onProceedToFinal }) => {
  const [pbState, setPbState] = useState('camera'); // 'camera' | 'layoutSelect' | 'preview' | 'finalPhotobooth'
  const [capturedPhotosList, setCapturedPhotosList] = useState([]);
  const [selectedLayoutId, setSelectedLayoutId] = useState('standardWhite');
  const [selectedFilterId, setSelectedFilterId] = useState('none');
  const [randomSeed, setRandomSeed] = useState(0);

  const defaultSamplePhotos = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80'
  ];

  // Photostrip Layout Options (Standard + Designed)
  const layoutsList = [
    // Standard Photostrips
    { id: 'standardWhite', category: 'Standard', title: 'Standard White Strip', emoji: '📸', desc: 'Classic minimalist white photobooth strip' },
    { id: 'standardBlack', category: 'Standard', title: 'Standard Black Film', emoji: '🎞️', desc: 'Sleek classic black photobooth film strip' },
    // Designed Photostrips
    { id: 'classic', category: 'Designed', title: 'Paper Notebook', emoji: '📜', desc: 'Ruled paper notebook strip with red margin & tape' },
    { id: 'pastel', category: 'Designed', title: 'Cute Pastel', emoji: '🌸', desc: 'Soft pastel background & flower doodles' },
    { id: 'scrapbook', category: 'Designed', title: 'Craft Scrapbook', emoji: '🎨', desc: 'Hand-taped paper with drawn hearts' },
    { id: 'animal', category: 'Designed', title: 'Pet Journal', emoji: '🐱', desc: 'Cats, dogs, bunnies & paw doodles' },
    { id: 'flowerGarden', category: 'Designed', title: 'Flower Garden', emoji: '💐', desc: 'Drawn flower borders & blooming petals' },
    { id: 'random', category: 'Designed', title: 'Surprise Notebook', emoji: '🎁', desc: 'Surprise mix of sketch colors & tape' }
  ];

  // Photo Filters List
  const filtersList = [
    { id: 'none', title: 'Normal', filterCss: 'none' },
    { id: 'vintage', title: 'Warm Vintage', filterCss: 'sepia(0.35) contrast(1.1) saturate(1.2)' },
    { id: 'bwSketch', title: 'B&W Sketch', filterCss: 'grayscale(1) contrast(1.35) brightness(1.05)' },
    { id: 'pastelPink', title: 'Pastel Dream', filterCss: 'saturate(1.35) hue-rotate(-15deg) brightness(1.08)' },
    { id: 'warmFilm', title: 'Golden Hour', filterCss: 'sepia(0.25) saturate(1.4) brightness(1.1)' },
    { id: 'coolVibe', title: 'Cool Retro', filterCss: 'hue-rotate(15deg) contrast(1.15) saturate(1.2)' }
  ];

  const handlePhotosCaptured = (photosArray) => {
    setCapturedPhotosList(photosArray);
    setPbState('layoutSelect');
  };

  const handleSelectLayout = (layoutId) => {
    if (layoutId === 'random') {
      setRandomSeed(Math.floor(Math.random() * 1000));
    }
    setSelectedLayoutId(layoutId);
    setPbState('preview');
  };

  const activePhotos = capturedPhotosList.length === 3 ? capturedPhotosList : defaultSamplePhotos;
  const currentFilter = filtersList.find((f) => f.id === selectedFilterId) || filtersList[0];

  const triggerFinish = () => {
    if (onProceedToFinal) {
      onProceedToFinal({
        photos: activePhotos,
        layoutId: selectedLayoutId,
        filterId: selectedFilterId,
        filterCss: currentFilter.filterCss
      });
    }
  };

  // Render Compact Photobooth Paper Strip Frame
  const renderLayoutContent = () => {
    const [img1, img2, img3] = activePhotos;
    const filterStyle = { filter: currentFilter.filterCss, transition: 'filter 0.3s ease' };

    // Standard White Photostrip
    if (selectedLayoutId === 'standardWhite') {
      return (
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '18px 14px 14px 14px',
          width: '100%',
          maxWidth: '240px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          borderRadius: '10px',
          border: '2px solid #E0E0E0',
          position: 'relative'
        }}>
          {[img1, img2, img3].map((img, i) => (
            <div key={i} style={{ width: '100%', aspectRatio: '4 / 3', borderRadius: '4px', overflow: 'hidden', border: '1.5px solid #EEE' }}>
              <img src={img} alt={`Shot ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', ...filterStyle }} />
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: '2px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: '700', color: '#222222', margin: 0, letterSpacing: '0.5px' }}>
              STUDIO PHOTOBOOTH 📸
            </p>
            <p style={{ fontSize: '0.72rem', color: '#777777', margin: '2px 0 0 0', fontWeight: '600' }}>
              2" × 6" Strip • {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>
      );
    }

    // Standard Black Photostrip (with real 35mm film sprockets)
    if (selectedLayoutId === 'standardBlack') {
      return (
        <div style={{
          backgroundColor: '#121212',
          padding: '18px 18px 14px 18px',
          width: '100%',
          maxWidth: '240px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
          borderRadius: '8px',
          border: '1px solid #333333',
          position: 'relative'
        }}>
          {/* Film Sprocket Perforations left & right */}
          <div style={{ position: 'absolute', left: '5px', top: '15px', bottom: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {[...Array(9)].map((_, k) => (
              <div key={k} style={{ width: '6px', height: '10px', backgroundColor: '#333', borderRadius: '2px', border: '1px solid #000' }} />
            ))}
          </div>
          <div style={{ position: 'absolute', right: '5px', top: '15px', bottom: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {[...Array(9)].map((_, k) => (
              <div key={k} style={{ width: '6px', height: '10px', backgroundColor: '#333', borderRadius: '2px', border: '1px solid #000' }} />
            ))}
          </div>

          {[img1, img2, img3].map((img, i) => (
            <div key={i} style={{ width: '100%', aspectRatio: '4 / 3', borderRadius: '4px', overflow: 'hidden', border: '2px solid #FFFFFF' }}>
              <img src={img} alt={`Shot ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', ...filterStyle }} />
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: '2px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: '700', color: '#FFFFFF', margin: 0, letterSpacing: '0.8px' }}>
              🎞️ 35MM RETRO FILM
            </p>
            <p style={{ fontSize: '0.7rem', color: '#AAAAAA', margin: '2px 0 0 0' }}>
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      );
    }

    // Designed: Paper Notebook Strip
    if (selectedLayoutId === 'classic') {
      return (
        <div className="photobooth-strip" style={{
          backgroundColor: '#FFFDF8',
          backgroundImage: 'linear-gradient(#E8DFF5 1px, transparent 1px)',
          backgroundSize: '100% 20px',
          padding: '24px 14px 14px 20px',
          width: '100%',
          maxWidth: '240px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          borderLeft: '3px solid #FF8DA1',
          position: 'relative'
        }}>
          <div className="paper-tape-top" />

          {[img1, img2, img3].map((img, i) => (
            <div key={i} style={{ width: '100%', aspectRatio: '4 / 3', borderRadius: '10px', overflow: 'hidden', border: '2.5px solid #3A2E2B', boxShadow: '0 3px 8px rgba(0,0,0,0.06)' }}>
              <img src={img} alt={`Shot ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', ...filterStyle }} />
            </div>
          ))}

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
            <DrawnHeart size={20} color="#FF5E85" fillColor="#FFB7C5" duration={0.8} />
            <p className="text-script" style={{ fontSize: '1.3rem', margin: 0, color: 'var(--sketch-dark)' }}>
              Best Memories 💗
            </p>
          </div>
        </div>
      );
    }

    // Designed: Pastel Gingham
    if (selectedLayoutId === 'pastel') {
      return (
        <div style={{
          backgroundColor: '#FFF5FA',
          backgroundImage: 'linear-gradient(rgba(255, 123, 156, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(180, 195, 232, 0.2) 1px, transparent 1px)',
          backgroundSize: '100% 24px, 24px 100%',
          borderRadius: '16px',
          padding: '20px 14px 14px 14px',
          border: '3px solid #FFB7C5',
          boxShadow: 'var(--shadow-paper)',
          width: '100%',
          maxWidth: '240px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          position: 'relative'
        }}>
          <div className="paper-tape-top" />

          {[img1, img2, img3].map((img, i) => (
            <div key={i} style={{ width: '100%', aspectRatio: '4 / 3', borderRadius: '10px', overflow: 'hidden', border: '2.5px solid #3A2E2B' }}>
              <img src={img} alt={`Pastel photo ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', ...filterStyle }} />
            </div>
          ))}

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
            <DrawnHeart size={18} color="#FF5E85" fillColor="#FFB7C5" duration={0.6} />
            <span style={{ backgroundColor: '#FFFDF8', border: '1.5px solid #3A2E2B', padding: '3px 10px', borderRadius: '16px', fontWeight: '700', fontFamily: 'var(--font-sketch)', color: '#3A2E2B', fontSize: '0.85rem' }}>
              Sweetest Smiles 🌸
            </span>
          </div>
        </div>
      );
    }

    // Designed: Craft Scrapbook
    if (selectedLayoutId === 'scrapbook') {
      return (
        <div style={{
          backgroundColor: '#F5EBE0',
          borderRadius: '14px',
          padding: '22px 14px 14px 14px',
          border: '2.5px dashed #4A3B32',
          boxShadow: 'var(--shadow-paper)',
          width: '100%',
          maxWidth: '240px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          position: 'relative'
        }}>
          <div className="paper-tape-top" />

          {[img1, img2, img3].map((img, i) => (
            <div key={i} style={{ width: '100%', aspectRatio: '4 / 3', borderRadius: '8px', overflow: 'hidden', border: '2.5px solid #4A3B32', position: 'relative' }}>
              {/* Corner washi tape accent */}
              <div style={{ position: 'absolute', top: '-6px', right: '-8px', width: '32px', height: '12px', backgroundColor: '#FFD1DC', transform: 'rotate(15deg)', border: '1px solid #3A2E2B', opacity: 0.85, zIndex: 2 }} />
              <img src={img} alt={`Scrapbook photo ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', ...filterStyle }} />
            </div>
          ))}

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
            <span style={{ backgroundColor: '#4A3B32', color: '#F5EBE0', padding: '3px 12px', borderRadius: '4px', fontWeight: '700', fontFamily: 'var(--font-sketch)', fontSize: '0.85rem', letterSpacing: '0.5px' }}>
              CRAFT SCRAPBOOK 🎨
            </span>
          </div>
        </div>
      );
    }

    // Designed: Pet Journal (Cats, Dogs, Bunnies)
    if (selectedLayoutId === 'animal') {
      return (
        <div style={{
          backgroundColor: '#F0FAF4',
          borderRadius: '16px',
          padding: '22px 14px 14px 14px',
          border: '3px solid #3A2E2B',
          boxShadow: 'var(--shadow-paper)',
          width: '100%',
          maxWidth: '240px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          position: 'relative'
        }}>
          {/* Peeking Cat on Top */}
          <div style={{ position: 'absolute', top: '-18px', right: '12px', zIndex: 3 }}>
            <CatIllustration size={36} mood="happy" />
          </div>

          {[img1, img2, img3].map((img, i) => (
            <div key={i} style={{ width: '100%', aspectRatio: '4 / 3', borderRadius: '10px', overflow: 'hidden', border: '2.5px solid #3A2E2B' }}>
              <img src={img} alt={`Pet photo ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', ...filterStyle }} />
            </div>
          ))}

          {/* Peeking Dog on Bottom */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
            <DogIllustration size={28} mood="happy" />
            <span style={{ backgroundColor: '#FFFDF8', border: '1.5px solid #3A2E2B', padding: '3px 10px', borderRadius: '14px', fontWeight: '700', fontFamily: 'var(--font-sketch)', color: '#3A2E2B', fontSize: '0.82rem' }}>
              Paw-fect Moments 🐱🐶
            </span>
          </div>
        </div>
      );
    }

    // Designed: Flower Garden
    if (selectedLayoutId === 'flowerGarden') {
      return (
        <div style={{
          backgroundColor: '#FFF0F5',
          borderRadius: '16px',
          padding: '22px 14px 14px 14px',
          border: '3px solid #E88D94',
          boxShadow: 'var(--shadow-paper)',
          width: '100%',
          maxWidth: '240px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          position: 'relative'
        }}>
          <div style={{ position: 'absolute', top: '-14px', left: '10px', zIndex: 3 }}>
            <FlowerIllustration size={32} color="#FFB7C5" />
          </div>

          {[img1, img2, img3].map((img, i) => (
            <div key={i} style={{ width: '100%', aspectRatio: '4 / 3', borderRadius: '10px', overflow: 'hidden', border: '2.5px solid #E88D94' }}>
              <img src={img} alt={`Flower photo ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', ...filterStyle }} />
            </div>
          ))}

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
            <FlowerIllustration size={24} color="#A29BFE" />
            <span style={{ backgroundColor: '#FFFDF8', border: '1.5px solid #E88D94', padding: '3px 10px', borderRadius: '14px', fontWeight: '700', fontFamily: 'var(--font-sketch)', color: '#3A2E2B', fontSize: '0.85rem' }}>
              Garden Memories 💐
            </span>
          </div>
        </div>
      );
    }

    // Default & Random Fallback (Surprise Notebook)
    return (
      <div style={{
        backgroundColor: '#F4F0FF',
        borderRadius: '16px',
        padding: '22px 14px 14px 14px',
        border: '3px solid #7C5CBF',
        boxShadow: 'var(--shadow-paper)',
        width: '100%',
        maxWidth: '240px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        position: 'relative'
      }}>
        <div className="paper-tape-top" />

        {[img1, img2, img3].map((img, i) => (
          <div key={i} style={{ width: '100%', aspectRatio: '4 / 3', borderRadius: '10px', overflow: 'hidden', border: '2.5px solid #7C5CBF' }}>
            <img src={img} alt={`Surprise photo ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', ...filterStyle }} />
          </div>
        ))}

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
          <SparkleIllustration size={20} color="#7C5CBF" />
          <span style={{ backgroundColor: '#FFFDF8', border: '1.5px solid #7C5CBF', padding: '3px 10px', borderRadius: '14px', fontWeight: '700', fontFamily: 'var(--font-sketch)', color: '#3A2E2B', fontSize: '0.85rem' }}>
            Surprise Photostrip ✨💗
          </span>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px 12px',
      position: 'relative',
      zIndex: 1
    }}>
      <AnimatePresence mode="wait">
        {/* STEP 1: CAMERA SCREEN */}
        {pbState === 'camera' && (
          <motion.div
            key="cameraStep"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{ width: '100%' }}
          >
            <CameraPhotobooth onPhotosCaptured={handlePhotosCaptured} />
          </motion.div>
        )}

        {/* STEP 2: LAYOUT SELECTION ON PAPER */}
        {pbState === 'layoutSelect' && (
          <motion.div
            key="layoutStep"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="paper-card theme-babyBlue"
            style={{
              padding: '28px 20px 20px 20px',
              maxWidth: '540px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              textAlign: 'center'
            }}
          >
            <div className="paper-tape-top" />

            <h2 className="heading-primary" style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Pick Your Photobooth Style</span>
              <DrawnHeart size={28} color="#FF5E85" fillColor="#FFB7C5" duration={0.8} />
            </h2>

            {/* Standard vs Designed Layouts Selector */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Category Group 1: Standard Strips */}
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontFamily: 'var(--font-sketch)', fontSize: '1.1rem', color: '#3A2E2B', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>⭐ Standard Photostrips</span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                  {layoutsList.filter(l => l.category === 'Standard').map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleSelectLayout(item.id)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: '10px 8px',
                        borderRadius: '14px',
                        backgroundColor: '#FFFDF8',
                        border: '2.5px solid #3A2E2B',
                        boxShadow: '0 3px 8px rgba(58, 46, 43, 0.06)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <span style={{ fontSize: '1.5rem' }}>{item.emoji}</span>
                      <span style={{ fontWeight: '700', fontFamily: 'var(--font-sketch)', fontSize: '0.9rem', color: 'var(--sketch-dark)' }}>
                        {item.title}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Category Group 2: Designed Notebook Strips */}
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontFamily: 'var(--font-sketch)', fontSize: '1.1rem', color: '#FF5E85', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🎨 Designed Notebook Frames</span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                  {layoutsList.filter(l => l.category === 'Designed').map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleSelectLayout(item.id)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: '10px 8px',
                        borderRadius: '14px',
                        backgroundColor: '#FFFDF8',
                        border: '2.5px solid #3A2E2B',
                        boxShadow: '0 3px 8px rgba(58, 46, 43, 0.06)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <span style={{ fontSize: '1.5rem' }}>{item.emoji}</span>
                      <span style={{ fontWeight: '700', fontFamily: 'var(--font-sketch)', fontSize: '0.9rem', color: 'var(--sketch-dark)' }}>
                        {item.title}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setPbState('camera')}
              style={{
                color: 'var(--sketch-muted)',
                fontFamily: 'var(--font-sketch)',
                fontWeight: '600',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'none'
              }}
            >
              <RefreshCw size={14} />
              <span>Retake Photos</span>
            </button>
          </motion.div>
        )}

        {/* STEP 3 & 4: PREVIEW & FINAL PHOTOBOOTH WITH FILTERS BAR */}
        {(pbState === 'preview' || pbState === 'finalPhotobooth') && (
          <motion.div
            key="previewStep"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
              width: '100%',
              maxWidth: '480px'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <h2 className="heading-primary" style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <span>{pbState === 'preview' ? 'Preview Your Photobooth' : 'Your Memory Scrapbook'}</span>
                <DrawnHeart size={30} color="#FF5E85" fillColor="#FFB7C5" duration={0.8} />
              </h2>
            </div>

            {/* PHOTO FILTERS SELECTOR BAR */}
            <div style={{
              width: '100%',
              backgroundColor: '#FFFDF8',
              border: '2.5px solid #3A2E2B',
              borderRadius: '16px',
              padding: '8px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(58, 46, 43, 0.06)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-sketch)', fontWeight: '700', fontSize: '0.95rem', color: '#3A2E2B' }}>
                <Sliders size={15} color="#FF5E85" />
                <span>Photo Filters:</span>
              </div>
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}>
                {filtersList.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFilterId(f.id)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '12px',
                      border: selectedFilterId === f.id ? '2px solid #FF5E85' : '1.5px solid #3A2E2B',
                      backgroundColor: selectedFilterId === f.id ? '#FFE5EC' : '#FFF',
                      color: selectedFilterId === f.id ? '#FF5E85' : '#3A2E2B',
                      fontWeight: '700',
                      fontFamily: 'var(--font-sketch)',
                      fontSize: '0.85rem',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer'
                    }}
                  >
                    {f.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Render Selected Photostrip Frame */}
            {renderLayoutContent()}

            {/* PERSONAL NOTE UNDERNEATH PHOTOBOOTH */}
            {pbState === 'finalPhotobooth' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  backgroundColor: '#FFFDF8',
                  padding: '14px 18px',
                  borderRadius: '18px',
                  border: '2.5px solid #3A2E2B',
                  boxShadow: 'var(--shadow-paper)',
                  textAlign: 'center',
                  width: '100%',
                  maxWidth: '380px',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <DrawnHeart size={24} color="#FF5E85" fillColor="#FFB7C5" duration={0.8} />
                  <h3 style={{ fontFamily: 'var(--font-sketch)', color: 'var(--deep-pink)', fontSize: '1.25rem' }}>
                    Look at you! 💗
                  </h3>
                </div>
                <p style={{ fontWeight: '600', fontFamily: 'var(--font-body)', color: 'var(--sketch-dark)', marginTop: '2px', fontSize: '0.95rem' }}>
                  You just made this photostrip look so iconic!
                </p>
              </motion.div>
            )}

            {/* ACTION BUTTONS */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {pbState === 'preview' ? (
                <>
                  <motion.button
                    onClick={() => setPbState('layoutSelect')}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '11px 20px',
                      borderRadius: '26px',
                      backgroundColor: '#FFFDF8',
                      border: '2.5px solid #3A2E2B',
                      color: 'var(--sketch-dark)',
                      fontWeight: '700',
                      fontFamily: 'var(--font-sketch)',
                      fontSize: '1rem'
                    }}
                  >
                    Try Another Layout ✨
                  </motion.button>

                  <motion.button
                    onClick={() => setPbState('finalPhotobooth')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '11px 28px',
                      borderRadius: '26px',
                      background: 'linear-gradient(135deg, #FF7B9C 0%, #FFB7C5 100%)',
                      color: '#FFFFFF',
                      border: '3px solid #3A2E2B',
                      fontWeight: '700',
                      fontFamily: 'var(--font-sketch)',
                      fontSize: '1.05rem',
                      boxShadow: '0 6px 18px rgba(58, 46, 43, 0.16)'
                    }}
                  >
                    Use This Photostrip 💗
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    onClick={() => setPbState('camera')}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '11px 18px',
                      borderRadius: '26px',
                      backgroundColor: '#FFFDF8',
                      border: '2.5px solid #3A2E2B',
                      color: 'var(--sketch-dark)',
                      fontWeight: '700',
                      fontFamily: 'var(--font-sketch)',
                      fontSize: '0.95rem'
                    }}
                  >
                    Take Another Photo 📸
                  </motion.button>

                  <motion.button
                    onClick={() => setPbState('layoutSelect')}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '11px 18px',
                      borderRadius: '26px',
                      backgroundColor: '#FFFDF8',
                      border: '2.5px solid #3A2E2B',
                      color: 'var(--sketch-dark)',
                      fontWeight: '700',
                      fontFamily: 'var(--font-sketch)',
                      fontSize: '0.95rem'
                    }}
                  >
                    Try Another Layout ✨
                  </motion.button>

                  <motion.button
                    onClick={triggerFinish}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '11px 26px',
                      borderRadius: '26px',
                      background: 'linear-gradient(135deg, #74B9FF 0%, #A29BFE 100%)',
                      color: '#FFFFFF',
                      border: '3px solid #3A2E2B',
                      fontWeight: '700',
                      fontFamily: 'var(--font-sketch)',
                      fontSize: '1.05rem',
                      boxShadow: '0 6px 18px rgba(58, 46, 43, 0.16)'
                    }}
                  >
                    Finish 💗
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
