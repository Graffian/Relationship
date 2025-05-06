import React, { useState, useEffect, useRef } from 'react';
import dinoImage from '../assets/dino.png';
import heartImage from '../assets/heart.png';
import './DinoGame.css';

const CatchHearts = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [dinoPosition, setDinoPosition] = useState(400);
  const [moveDirection, setMoveDirection] = useState(0);

  const gameAreaRef = useRef(null);
  const lastFrameTime = useRef(0);
  const animationFrameId = useRef(null);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying) return;
      if (e.key === 'ArrowLeft') {
        setMoveDirection(-1);
      } else if (e.key === 'ArrowRight') {
        setMoveDirection(1);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        setMoveDirection(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying]);

  // Update dino position based on movement
  useEffect(() => {
    if (!isPlaying) return;

    const moveDino = () => {
      setDinoPosition(prev => {
        const newPosition = prev + (moveDirection * 5);
        return Math.max(50, Math.min(newPosition, gameAreaRef.current.clientWidth - 50));
      });
    };

    const moveInterval = setInterval(moveDino, 16);
    return () => clearInterval(moveInterval);
  }, [isPlaying, moveDirection]);

  // Spawn hearts
  useEffect(() => {
    if (!isPlaying) return;

    const spawnHeart = () => {
      const x = Math.random() * (gameAreaRef.current.clientWidth - 40);
      setHearts(prev => [...prev, { id: Date.now(), x, y: 0 }]);
    };

    const heartInterval = setInterval(spawnHeart, 1500);
    return () => clearInterval(heartInterval);
  }, [isPlaying]);

  // Game loop
  useEffect(() => {
    if (!isPlaying) return;

    const gameLoop = (timestamp) => {
      if (!lastFrameTime.current) lastFrameTime.current = timestamp;
      const deltaTime = timestamp - lastFrameTime.current;

      if (deltaTime > 16) {
        setHearts(prev => {
          return prev
            .map(heart => ({
              ...heart,
              y: heart.y + 2
            }))
            .filter(heart => {
              if (heart.y > 400 && Math.abs(heart.x - dinoPosition) < 60) {
                setScore(s => s + 1);
                return false;
              }
              return heart.y < 500;
            });
        });
        lastFrameTime.current = timestamp;
      }

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    animationFrameId.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isPlaying, dinoPosition]);

  // Timer
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsPlaying(false);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setHearts([]);
    setIsPlaying(true);
    setGameOver(false);
    lastFrameTime.current = 0;
    setDinoPosition(400);
  };

  return (
    <div className="game-wrapper">
      <div className="game-header">
        <h1>Catch the Hearts!</h1>
        <div className="score-display">
          <span>Score: {score}</span>
          <span className="timer">Time: {timeLeft}s</span>
        </div>
      </div>

      <div 
        className="game-container"
        ref={gameAreaRef}
      >
        <div
          className="dino"
          style={{
            left: `${dinoPosition}px`,
            backgroundImage: `url(${dinoImage})`
          }}
        />

        {hearts.map(heart => (
          <div
            key={heart.id}
            className="heart"
            style={{
              left: `${heart.x}px`,
              top: `${heart.y}px`,
              backgroundImage: `url(${heartImage})`
            }}
          />
        ))}

        {!isPlaying && !gameOver && (
          <div className="start-screen">
            <h2>Use Left and Right Arrow Keys to Move!</h2>
            <p>You have 30 seconds to catch as many hearts as possible!</p>
            <button className="start-button" onClick={startGame}>
              Start Game
            </button>
          </div>
        )}

        {gameOver && (
          <div className="game-over-screen">
            <h2>Time's Up!</h2>
            <p>You caught {score} hearts!</p>
            <button className="restart-button" onClick={startGame}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatchHearts;
