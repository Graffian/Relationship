import React, { useState } from 'react';
import './Quiz.css';

const Quiz = () => {
  const [answers, setAnswers] = useState({
    theme: '',
    firstDate: '',
    restaurant: ''
  });

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
      restaurant: ''
    });
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-header">Our Special Quiz</h1>
      
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

      <div className="quiz-buttons">
        <button className="done-button">Done</button>
        <button className="reset-button" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Quiz; 