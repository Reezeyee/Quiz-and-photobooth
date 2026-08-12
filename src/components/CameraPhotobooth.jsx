import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Camera, RefreshCw, Upload, Heart } from 'lucide-react';
import { DrawnHeart } from './DrawnHeart';
import { FlowerIllustration, CatIllustration, DogIllustration } from '../assets/illustrations';

export const CameraPhotobooth = ({ onPhotosCaptured }) => {
  const [stream, setStream] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [countdown, setCountdown] = useState(null); // null | 5 | 4 | 3 | 2 | 1 | 0
  const [currentShotIndex, setCurrentShotIndex] = useState(0); // 0, 1, 2
  const [isCapturingSequence, setIsCapturingSequence] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState([]); // array of 3 data URLs

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      clearCountdownTimer();
      stopCameraStream();
    };
  }, []);

  const clearCountdownTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const stopCameraStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const startCamera = async () => {
    try {
      setHasPermission(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      setStream(mediaStream);
      setHasPermission(true);
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.warn("Camera permission denied or unavailable:", err);
      setHasPermission(false);
      setIsCameraActive(false);
    }
  };

  // Start the 3-shot burst capture sequence with 5-second timers
  const startBurstSequence = () => {
    clearCountdownTimer();
    setCapturedPhotos([]);
    setCurrentShotIndex(0);
    setIsCapturingSequence(true);
    runSingle5SecondTimer(0, []);
  };

  const runSingle5SecondTimer = (shotIndex, existingPhotos) => {
    clearCountdownTimer();
    setCurrentShotIndex(shotIndex);
    setCountdown(5);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearCountdownTimer();
          // Snap photo at zero safely
          captureSinglePhoto(shotIndex, existingPhotos);
          return 0;
        }
        return Math.max(0, prev - 1);
      });
    }, 1000);
  };

  const captureSinglePhoto = (shotIndex, existingPhotos) => {
    // Camera flash effect
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 350);

    const video = videoRef.current;
    if (video && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.95);

      const newPhotos = [...existingPhotos, imageDataUrl];
      setCapturedPhotos(newPhotos);
      confetti({ particleCount: 25, spread: 50, origin: { y: 0.7 } });

      if (shotIndex + 1 < 3) {
        // Prepare next shot after brief 1.5s pose transition break
        setTimeout(() => {
          runSingle5SecondTimer(shotIndex + 1, newPhotos);
        }, 1400);
      } else {
        // Sequence finished!
        setIsCapturingSequence(false);
        setCountdown(null);
        clearCountdownTimer();
        stopCameraStream();
        confetti({ particleCount: 80, spread: 90, origin: { y: 0.5 } });
      }
    }
  };

  const handleRetake = () => {
    clearCountdownTimer();
    setCapturedPhotos([]);
    setCurrentShotIndex(0);
    setIsCapturingSequence(false);
    setCountdown(null);
    startCamera();
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const loaded = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          loaded.push(event.target.result);
          if (loaded.length === files.length || loaded.length === 3) {
            // Fill 3 array slots
            while (loaded.length < 3) {
              loaded.push(loaded[0]);
            }
            setCapturedPhotos(loaded.slice(0, 3));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      maxWidth: '520px',
      margin: '0 auto',
      position: 'relative'
    }}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Camera Flash Overlay */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: '#FFFFFF',
              zIndex: 9999,
              pointerEvents: 'none'
            }}
          />
        )}
      </AnimatePresence>

      <div className="paper-card theme-lavender" style={{
        padding: '24px 18px 20px 18px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="paper-tape-top" />

        {/* Floating Corner Decor */}
        <div style={{ position: 'absolute', top: 10, left: 10 }}><FlowerIllustration size={36} color="#FFB7C5" /></div>
        <div style={{ position: 'absolute', top: 10, right: 10 }}><DrawnHeart size={30} color="#FF5E85" fillColor="#FFB7C5" duration={1} /></div>
        <div style={{ position: 'absolute', bottom: 10, left: 10 }}><CatIllustration size={36} mood="happy" /></div>
        <div style={{ position: 'absolute', bottom: 10, right: 10 }}><DogIllustration size={36} mood="happy" /></div>

        {capturedPhotos.length < 3 ? (
          <>
            <div style={{ textAlign: 'center', zIndex: 2 }}>
              <h2 className="heading-primary" style={{ fontSize: '1.5rem' }}>
                {isCapturingSequence ? `Pose ${currentShotIndex + 1} of 3! 📸` : 'Ready for 3 Photos? 📸'}
              </h2>
              <p style={{ color: 'var(--sketch-muted)', fontFamily: 'var(--font-sketch)', fontWeight: '600', marginTop: '2px', fontSize: '1rem' }}>
                5-second timer per photo • Switch smiles!
              </p>
            </div>

            {/* Live Camera Viewport on Paper (Compact Height 240px) */}
            <div style={{
              width: '100%',
              maxWidth: '420px',
              height: '240px',
              backgroundColor: '#1E1E2E',
              borderRadius: '20px',
              border: '3.5px solid #3A2E2B',
              boxShadow: '0 8px 20px rgba(58, 46, 43, 0.16)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: isCameraActive ? 'block' : 'none',
                  transform: 'scaleX(-1)'
                }}
              />

              {/* 5-Second Countdown Overlay */}
              <AnimatePresence>
                {countdown !== null && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(58, 46, 43, 0.65)',
                      backdropFilter: 'blur(3px)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      zIndex: 10
                    }}
                  >
                    <span style={{ color: '#FFF5BA', fontFamily: 'var(--font-sketch)', fontWeight: '700', fontSize: '1.15rem' }}>
                      Photo {currentShotIndex + 1} of 3
                    </span>

                    <motion.div
                      key={countdown}
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: [0.3, 1.3, 1], opacity: 1 }}
                      transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      {countdown === 0 ? (
                        <DrawnHeart size={70} color="#FF5E85" fillColor="#FFB7C5" duration={0.4} />
                      ) : (
                        <span style={{
                          fontSize: '5.5rem',
                          fontFamily: 'var(--font-heading)',
                          color: '#FFF5BA',
                          textShadow: '0 0 20px rgba(255, 94, 133, 0.9)'
                        }}>
                          {countdown}
                        </span>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Enable Camera Prompt */}
              {!isCameraActive && (
                <div style={{
                  padding: '16px',
                  textAlign: 'center',
                  color: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <Camera size={40} color="#FF7B9C" />
                  <p style={{ fontWeight: '600', fontSize: '0.95rem', color: '#E8DFF5' }}>
                    {hasPermission === false
                      ? 'Camera permission denied or not found.'
                      : 'Click below to turn on your camera!'}
                  </p>
                  <button
                    onClick={startCamera}
                    style={{
                      padding: '10px 24px',
                      borderRadius: '24px',
                      backgroundColor: '#74B9FF',
                      color: '#FFFFFF',
                      border: '2.5px solid #3A2E2B',
                      fontWeight: '700',
                      fontSize: '1rem',
                      boxShadow: '0 4px 12px rgba(58, 46, 43, 0.15)'
                    }}
                  >
                    Enable Camera 🎥
                  </button>
                </div>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', width: '100%', zIndex: 2 }}>
              {isCameraActive && (
                <motion.button
                  onClick={startBurstSequence}
                  disabled={isCapturingSequence}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '13px 36px',
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
                  <Camera size={20} />
                  <span>Start 3-Photo Session 📸</span>
                </motion.button>
              )}

              <label style={{
                color: 'var(--sketch-muted)',
                fontFamily: 'var(--font-sketch)',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Upload size={14} />
                <span>Upload Photos Instead 📷</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </>
        ) : (
          /* REVIEW 3 CAPTURED PHOTOS */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
              width: '100%',
              zIndex: 2
            }}
          >
            <h2 className="heading-primary" style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>All 3 Shots Look Cute!</span>
              <DrawnHeart size={30} color="#FF5E85" fillColor="#FFB7C5" duration={0.8} />
            </h2>

            {/* 3 Photos Grid Preview */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              width: '100%',
              maxWidth: '420px'
            }}>
              {capturedPhotos.map((photo, i) => (
                <div key={i} style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '3px solid #3A2E2B',
                  boxShadow: '0 4px 12px rgba(58, 46, 43, 0.12)'
                }}>
                  <img src={photo} alt={`Captured shot ${i + 1}`} style={{ width: '100%', display: 'block' }} />
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <motion.button
                onClick={handleRetake}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '11px 22px',
                  borderRadius: '26px',
                  backgroundColor: '#FFFDF8',
                  border: '2.5px solid #3A2E2B',
                  color: 'var(--sketch-dark)',
                  fontWeight: '700',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <RefreshCw size={16} />
                <span>Retake 🔄</span>
              </motion.button>

              <motion.button
                onClick={() => onPhotosCaptured(capturedPhotos)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '11px 28px',
                  borderRadius: '26px',
                  background: 'linear-gradient(135deg, #FF7B9C 0%, #FFB7C5 100%)',
                  color: '#FFFFFF',
                  border: '3px solid #3A2E2B',
                  fontWeight: '700',
                  fontSize: '1rem',
                  boxShadow: '0 6px 18px rgba(58, 46, 43, 0.16)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Heart size={16} />
                <span>Use Photos 💗</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
