import React, { Component } from 'react';
//import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuestion: 0,
      score: 0,
      questions: [
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
      ],
	  answeredQuestions: new Array(21).fill(false), 
    };
  }

  
  handleAnswerClick = (selectedOptionIndex) => {
    const { currentQuestion, questions, score, answeredQuestions } = this.state;

    // Check if the question has already been answered or the quiz is completed
    if (answeredQuestions[currentQuestion] || this.state.quizCompleted) {
      return;
    }

    const selectedScore = questions[currentQuestion].scores[selectedOptionIndex];

    this.setState((prevState) => ({
      score: prevState.score + selectedScore,
      answeredQuestions: prevState.answeredQuestions.map((value, index) =>
        index === currentQuestion ? true : value
      ),
    }));

    if (currentQuestion < questions.length - 1) {
      // Increment currentQuestion only if it's not the last question
      this.setState({
        currentQuestion: currentQuestion + 1,
      });
    } else {
      // If it's the last question, mark the quiz as completed
      this.setState({
        quizCompleted: true,
      });
    }
  };

  render() {
    const { currentQuestion, score, questions, quizCompleted } = this.state;

    return (
      <div className="quiz-app">
        {quizCompleted ? (
          <div>
            <h2>Assessment completed!</h2>
            <p>Your final score is: {score}</p>
          </div>
        ) : (
          <div>
            <h2>Question {currentQuestion + 1}</h2>
            <p>{questions[currentQuestion].question}</p>
            <ul>
              {questions[currentQuestion].options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => this.handleAnswerClick(index)}
                >
                  {option}
                </li>
              ))}
            </ul>
            <p>Score: {score}</p>
            {currentQuestion === questions.length - 1 && (
              <button onClick={() => this.setState({ quizCompleted: true })}>
                Submit
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;