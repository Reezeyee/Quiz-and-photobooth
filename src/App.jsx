import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CuteBackground } from './components/CuteBackground';
import { Home } from './components/Home';
import { Quiz } from './components/Quiz';
import { FlowerReveal } from './components/FlowerReveal';
import { PhotoBooth } from './components/PhotoBooth';
import { FinalMessage } from './components/FinalMessage';

export function App() {
  // Application Stage State: 'home' | 'quiz' | 'flower' | 'photobooth' | 'final'
  const [stage, setStage] = useState('home');
  const [quizResult, setQuizResult] = useState(null);
  const [photostripData, setPhotostripData] = useState(null);

  const handleStartQuiz = () => {
    setStage('quiz');
  };

  const handleQuizComplete = (result) => {
    setQuizResult(result);
    setStage('flower');
  };

  const handleProceedToPhotobooth = () => {
    setStage('photobooth');
  };

  const handleProceedToFinal = (data) => {
    setPhotostripData(data);
    setStage('final');
  };

  const handleRestart = () => {
    setQuizResult(null);
    setPhotostripData(null);
    setStage('home');
  };

  return (
    <main style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Background Animated Petals, Hearts, Stars & Pets */}
      <CuteBackground />

      {/* Main View Router */}
      <AnimatePresence mode="wait">
        {stage === 'home' && (
          <Home key="home" onStartQuiz={handleStartQuiz} />
        )}

        {stage === 'quiz' && (
          <Quiz key="quiz" onQuizComplete={handleQuizComplete} />
        )}

        {stage === 'flower' && (
          <FlowerReveal key="flower" onProceedToPhotobooth={handleProceedToPhotobooth} />
        )}

        {stage === 'photobooth' && (
          <PhotoBooth key="photobooth" onProceedToFinal={handleProceedToFinal} />
        )}

        {stage === 'final' && (
          <FinalMessage key="final" photostripData={photostripData} onRestartQuiz={handleRestart} />
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
