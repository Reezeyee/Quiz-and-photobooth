import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnswerButton } from './AnswerButton';
import { DrawnHeart } from './DrawnHeart';
import { CatIllustration, DogIllustration, FlowerIllustration, SparkleIllustration, BunnyIllustration } from '../assets/illustrations';

export const QuestionCard = ({
  questionData,
  onAnswerSelected
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const timerRef = useRef(null);

  // Clear timeout on unmount or question change to prevent leak
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [questionData.id]);

  const handleSelect = (answer) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    timerRef.current = setTimeout(() => {
      onAnswerSelected(answer);
    }, 1800);
  };

  const themeClass = `theme-${questionData.themeColor || 'pink'}`;

  return (
    <motion.div
      className={`paper-card ${themeClass}`}
      initial={{ opacity: 0, x: 40, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -40, scale: 0.96 }}
      transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        maxWidth: '520px',
        width: '100%',
        padding: '24px 22px 20px 22px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        position: 'relative'
      }}
    >
      {/* Paper Washi Tape Corner Accents */}
      <div className="paper-tape-top" />
      <div className="paper-tape-left" />
      <div className="paper-tape-right" />

      {/* Header: Pet Sketch & Drawn Hearts */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 3 }}>
        <motion.div
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {questionData.petReaction === 'happyCat' ? (
            <CatIllustration size={44} mood="happy" />
          ) : (
            <DogIllustration size={44} mood="happy" />
          )}
        </motion.div>

        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <BunnyIllustration size={32} />
          </motion.div>

          <DrawnHeart
            size={28}
            color="#FF5E85"
            fillColor="#FFB7C5"
            duration={1.2}
            delay={0.2}
          />

          <motion.div animate={{ rotate: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity }}>
            <FlowerIllustration size={34} color={questionData.themeColor === 'lavender' ? '#A29BFE' : '#FFB7C5'} />
          </motion.div>
        </div>
      </div>

      {/* Question Text */}
      <h2 className="heading-secondary" style={{
        fontSize: '1.3rem',
        lineHeight: 1.35,
        textAlign: 'center',
        color: 'var(--sketch-dark)',
        zIndex: 3
      }}>
        {questionData.question}
      </h2>

      {/* Answer Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', zIndex: 3 }}>
        {questionData.answers.map((answer, idx) => (
          <AnswerButton
            key={`${questionData.id}-${idx}`}
            answerText={answer}
            isSelected={selectedAnswer === answer}
            isAnswered={isAnswered}
            onSelect={() => handleSelect(answer)}
            themeColor={questionData.themeColor}
          />
        ))}
      </div>

      {/* Hand-Drawn Reaction Sticky Note Toast */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            style={{
              padding: '10px 16px',
              borderRadius: '14px',
              backgroundColor: '#FFF5BA',
              border: '2.5px solid #3A2E2B',
              boxShadow: '0 6px 16px rgba(58, 46, 43, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              textAlign: 'center',
              zIndex: 4
            }}
          >
            <DrawnHeart
              size={28}
              color="#FF5E85"
              fillColor="#FF7B9C"
              duration={0.7}
            />

            <span style={{
              fontFamily: 'var(--font-sketch)',
              fontWeight: '700',
              color: '#3A2E2B',
              fontSize: '1.05rem'
            }}>
              {questionData.reactionMessage}
            </span>

            <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}>
              <SparkleIllustration size={22} color="#FF5E85" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
