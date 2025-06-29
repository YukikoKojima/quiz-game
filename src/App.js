import React, { useEffect } from 'react';
import './App.css';
import QuizGame from './QuizGame';

function App() {
  useEffect(() => {
    const createSparkle = () => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = `${Math.random() * 100}vw`;
      sparkle.style.top = `${Math.random() * 100}vh`;
      sparkle.style.animationDuration = `${Math.random() * 2 + 1}s`;
      sparkle.style.animationDelay = `${Math.random() * 2}s`;
      document.querySelector('.App').appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 3000);
    };

    const interval = setInterval(createSparkle, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <QuizGame />
    </div>
  );
}

export default App;
