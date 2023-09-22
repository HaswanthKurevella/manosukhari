import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [depressionScore, setDepressionScore] = useState(0);
  const [stressScore, setStressScore] = useState(0);
  const [anxiousScore, setAnxiousScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Array(21).fill(false));

  const questions = [
    {
      question: 'Did you often find yourself getting upset about little things?',
      options: ['Not at all', 'Rarely', 'Sometimes', 'Frequently'],
  scores: [0, 1, 2, 3],
    },
    {
      question: 'Have you ever experienced dizziness or a feeling like you were about to faint?',
      options: ['Not at all', 'Rarely', 'Sometimes', 'Frequently'],
  scores: [0, 1, 2, 3],
    },
    {
      question: 'Did you find it difficult to enjoy anything?',
      options: ['Not at all', 'Rarely', 'Sometimes', 'Frequently'],
  scores: [0, 1, 2, 3],
    },
    {
      question: 'Have you ever had trouble breathing, such as fast breathing, even when you weren\'t exercising or sick?',
      options: ['Not at all', 'Rarely', 'Sometimes', 'Frequently'],
  scores: [0, 1, 2, 3],
    },
    {
      question: 'Did you ever feel like you hated your life?',
      options: ['Not at all', 'Rarely', 'Sometimes', 'Frequently'],
  scores: [0, 1, 2, 3],
    },
    {
      question: 'Did you tend to overreact to situations?',
      options: ['Not at all', 'Rarely', 'Sometimes', 'Frequently'],
  scores: [0, 1, 2, 3],
    },
    {
      question: 'Have you ever experienced shaky hands?',
      options: ['Not at all', 'Rarely', 'Sometimes', 'Frequently'],
  scores: [0, 1, 2, 3],
    },
    {
      question: 'Did you often feel stressed about many things?',
      options: ['Not at all', 'Rarely', 'Sometimes', 'Frequently'],
  scores: [0, 1, 2, 3],
    },
    {
      question: 'Have you ever felt terrified for no apparent reason?',
      options: ['Not at all', 'Rarely', 'Sometimes', 'Frequently'],
  scores: [0, 1, 2, 3],
    },
    {
      question: 'Were there times when you couldn\'t find anything nice to look forward to?',
      options: ['Not at all', 'Rarely', 'Sometimes', 'Frequently'],
  scores: [0, 1, 2, 3],
    },
    {
      question: 'Did you frequently find yourself easily irritated?',
      options: ['Not at all', 'Rarely', 'Sometimes', 'Frequently'],
  scores: [0, 1, 2, 3],
    },
    {
      question: 'Was it hard for you to relax?',
      options: ['Not at all', 'Rarely', 'Sometimes', 'Frequently'],
  scores: [0, 1, 2, 3],
    },
    {
      question: 'Were you unable to stop feeling sad at times?',
      options: ['Not at all', 'Rarely', 'Sometimes', 'Frequently'],
  scores: [0, 1, 2, 3],
    },
    {
      question: 'Did you get annoyed when people interrupted you?',
      options: ['Not at all', 'Rarely', 'Sometimes', 'Frequently'],
  scores: [0, 1, 2, 3],
    },
    {
      question: 'Have you ever felt like you were about to panic?',
      options: ['Not at all', 'Rarely', 'Sometimes', 'Frequently'],
  scores: [0, 1, 2, 3],
    },
    {
      question: 'Did you ever have moments where you hated yourself?',
      options: ['Not at all', 'Rarely', 'Sometimes', 'Frequently'],
  scores: [0, 1, 2, 3],
    },
    {
      question: 'Did you ever feel like you weren\'t good enough?',
      options: ['Not at all', 'Rarely', 'Sometimes', 'Frequently'],
  scores: [0, 1, 2, 3],
    },
    {
      question: 'Were you easily annoyed by things or people?',
      options: ['Not at all', 'Rarely', 'Sometimes', 'Frequently'],
  scores: [0, 1, 2, 3],
    },
    {
      question: 'Did you experience a rapid heartbeat without strenuous exercise?',
      options: ['Not at all', 'Rarely', 'Sometimes', 'Frequently'],
  scores: [0, 1, 2, 3],
    },
    {
      question: 'Have you ever felt scared without any apparent reason?',
      options: ['Not at all', 'Rarely', 'Sometimes', 'Frequently'],
      scores: [0, 1, 2, 3],
    },
    {
      question: 'Did you ever feel that life was terrible?',
      options: ['Not at all', 'Rarely', 'Sometimes', 'Frequently'],
  scores: [0, 1, 2, 3],
    },
    // ... (other questions)
  ];

  const depressionQuestions = [2, 4, 9, 12, 15, 16, 20];
  const stressQuestions = [0, 5, 7, 10, 11, 13, 17];
  const anxiousQuestions = [1, 3, 6, 8, 14, 19];

  const handleAnswerClick = async (selectedOptionIndex) => {
    if (answeredQuestions[currentQuestion] || quizCompleted) {
      return;
    }

    const selectedScore = questions[currentQuestion].scores[selectedOptionIndex];

    if (depressionQuestions.includes(currentQuestion)) {
      setDepressionScore(depressionScore + selectedScore);
    } else if (stressQuestions.includes(currentQuestion)) {
      setStressScore(stressScore + selectedScore);
    } else if (anxiousQuestions.includes(currentQuestion)) {
      setAnxiousScore(anxiousScore + selectedScore);
    }

    setAnsweredQuestions((prevAnsweredQuestions) =>
      prevAnsweredQuestions.map((value, index) =>
        index === currentQuestion ? true : value
      )
    );

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      // Call sendAssessmentData here
      await sendAssessmentData();
    }
  };

  const sendAssessmentData = async () => {
    const assessmentData = {
      depressionScore,
      stressScore,
      anxiousScore,
    };

    try {
      await axios.post('http://localhost:8000/api/save-assessment', assessmentData);
      setQuizCompleted(true);
    } catch (error) {
      console.error('Error saving assessment data:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div className="quiz-app">
      {quizCompleted ? (
        <div>
          <h2>Assessment completed!</h2>
          <p>Depression Score: {depressionScore}</p>
          <p>Stress Score: {stressScore}</p>
          <p>Anxious Score: {anxiousScore}</p>
          {/* {chartData && (
            <div>
              <h3>Score Summary</h3>
              <Bar data={chartData} />
            </div>
          )} */}
        </div>
      ) : (
        <div>
          <h2>Question {currentQuestion + 1}</h2>
          <p>{questions[currentQuestion].question}</p>
          <ul>
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index} onClick={() => handleAnswerClick(index)}>
                {option}
              </li>
            ))}
          </ul>
          {/* <p>Depression Score: {depressionScore}</p>
          <p>Stress Score: {stressScore}</p>
          <p>Anxious Score: {anxiousScore}</p> */}
          {currentQuestion === questions.length - 1 && (
            <button onClick={() => setQuizCompleted(true)}>Submit</button>
          )}
        </div>
      )}
    </div>
  );
}

export default Assessment;
