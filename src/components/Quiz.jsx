import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import { questions } from '../data/questions';

export const Quiz = ({ onQuizComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersMap, setAnswersMap] = useState({});

  const handleAnswer = (selectedChoice) => {
    setAnswersMap((prev) => ({ ...prev, [currentIndex]: selectedChoice }));

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed all 8 questions! Move to flower reveal
      onQuizComplete({ answersMap });
    }
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '24px 16px',
      position: 'relative',
      zIndex: 1
    }}>
      <ProgressBar currentStep={currentIndex + 1} totalSteps={questions.length} />

      <AnimatePresence mode="wait">
        <QuestionCard
          key={`qcard-${currentQuestion.id}`}
          questionData={currentQuestion}
          onAnswerSelected={handleAnswer}
        />
      </AnimatePresence>
    </div>
  );
};
