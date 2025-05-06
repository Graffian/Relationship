import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

const Quiz = () => {
  const [answers, setAnswers] = useState({
    theme: '',
    firstDate: '',
    restaurant: '',
    skinColor: ''
  });
  const [isComplete, setIsComplete] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to start music
    const startMusic = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 26;
        audioRef.current.play().catch(error => {
          console.log("Autoplay prevented:", error);
        });
      }
    };

    // Try to start music immediately
    startMusic();

    // Add click event listener to the document to handle autoplay restrictions
    const handleFirstInteraction = () => {
      startMusic();
      document.removeEventListener('click', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 26;
      }
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  useEffect(() => {
    // Check if all questions are answered
    const allAnswered = Object.values(answers).every(answer => answer !== '');
    setIsComplete(allAnswered);
  }, [answers]);

  const handleChange = (question, value) => {
    setAnswers(prev => ({
      ...prev,
      [question]: value
    }));
  };

  const handleReset = () => {
    setAnswers({
      theme: '',
      firstDate: '',
      restaurant: '',
      skinColor: ''
    });
    setIsComplete(false);
  };

  const handleDone = () => {
    if (isComplete) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      // Check if all answers are correct
      const isCorrect = 
        answers.theme === 'blue+pink' &&
        answers.firstDate === 'khandagiri' &&
        answers.restaurant === 'biryani/tissues' &&
        answers.skinColor === 'white';

      if (isCorrect) {
        navigate('/success');
      } else {
        // Reset all answers
        setAnswers({
          theme: '',
          firstDate: '',
          restaurant: '',
          skinColor: ''
        });
        setIsComplete(false);
        // Show warning message
        setShowMessage(true);
        // Hide message after 3 seconds
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      }
    } else {
      alert('Please answer all questions before submitting!');
    }
  };

  return (
    <div className="quiz-container">
      <audio 
        ref={audioRef}
        src="/src/assets/no-pole.mp3"
        loop
        className="background-music"
        autoPlay
      />

      <h1 className="quiz-header">Our Special Quiz</h1>
      
      {showMessage && (
        <div className="warning-message">
          YOU'RE NOT SNEHA STAY AWAY!!
        </div>
      )}

      <div className="quiz-card">
        <div className="question-section">
          <h2>What's our favorite color combination?</h2>
          <select 
            value={answers.theme} 
            onChange={(e) => handleChange('theme', e.target.value)}
            className="quiz-select"
          >
            <option value="">Select an option</option>
            <option value="blue+pink">Blue + Pink</option>
            <option value="pink">Pink</option>
            <option value="pink+black">Pink + Black</option>
          </select>
          {answers.theme && (
            <div className="selected-answer">
              Selected: {answers.theme}
            </div>
          )}
        </div>
        <div className="image-section">
          <img src="/src/assets/theme.jpg" alt="Our Theme" className="quiz-image" />
        </div>
      </div>

      <div className="quiz-card">
        <div className="question-section">
          <h2>Where was our first date?</h2>
          <select 
            value={answers.firstDate} 
            onChange={(e) => handleChange('firstDate', e.target.value)}
            className="quiz-select"
          >
            <option value="">Select an option</option>
            <option value="khandagiri">Khandagiri</option>
            <option value="anandaban">Anandaban</option>
            <option value="museum">Museum</option>
          </select>
          {answers.firstDate && (
            <div className="selected-answer">
              Selected: {answers.firstDate}
            </div>
          )}
        </div>
        <div className="image-section">
          <img src="/src/assets/date.jpg" alt="Our First Date" className="quiz-image" />
        </div>
      </div>

      <div className="quiz-card">
        <div className="question-section">
          <h2>What do we rate in restaurants?</h2>
          <select 
            value={answers.restaurant} 
            onChange={(e) => handleChange('restaurant', e.target.value)}
            className="quiz-select"
          >
            <option value="">Select an option</option>
            <option value="biryani/tissues">Biryani/Tissues</option>
            <option value="naan">Naan</option>
            <option value="water">Water</option>
          </select>
          {answers.restaurant && (
            <div className="selected-answer">
              Selected: {answers.restaurant}
            </div>
          )}
        </div>
        <div className="image-section">
          <img src="/src/assets/food.jpg" alt="Our Food Adventures" className="quiz-image" />
        </div>
      </div>

      <div className="quiz-card">
        <div className="question-section">
          <h2>My skin color?</h2>
          <select 
            value={answers.skinColor} 
            onChange={(e) => handleChange('skinColor', e.target.value)}
            className="quiz-select"
          >
            <option value="">Select an option</option>
            <option value="white">White</option>
          </select>
          {answers.skinColor && (
            <div className="selected-answer">
              Selected: {answers.skinColor}
            </div>
          )}
        </div>
        <div className="image-section">
          <img src="/src/assets/skin.jpg" alt="Skin Color" className="quiz-image" />
        </div>
      </div>

      <div className="quiz-buttons">
        <button 
          className={`done-button ${isComplete ? 'complete' : ''}`}
          onClick={handleDone}
        >
          Done
        </button>
        <button className="reset-button" onClick={handleReset}>Reset</button>
      </div>

      <div className="quiz-message">
        <p>
          Sneha i know mai bohot saare blunders krta hu in dates like the time we went outside cuttack and we did not know many more like paani na leke aana and all that but still tu merse gussa ni hoti ya kuch you say its okay but mai to panic krjaata hu ki shit mene kitni badi galti krdi paani ni laaya khaana khane ni dia aur mere pas pese b nai h khilane k liye like that but you always did forgive me everytime and thats so good about you. i love you so much for that
        </p>
      </div>
    </div>
  );
};

export default Quiz; 