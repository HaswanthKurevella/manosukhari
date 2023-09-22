import React, { Component } from 'react';
//import './App.css';

class Assesment extends Component {
  constructor(props) {
    super(props);

    this.state = {
		currentQuestion: 0,
		depressionScore: 0,
		stressScore: 0,
		anxiousScore: 0,
		chartData: null,
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
	this.depressionQuestions = [2, 4, 9, 12, 15, 16, 20];
    this.stressQuestions = [0, 5, 7, 10, 11, 13, 17];
    this.anxiousQuestions = [1, 3, 6, 8, 14, 19];
  }

  
  handleAnswerClick = (selectedOptionIndex) => {
    const { currentQuestion, questions, answeredQuestions } = this.state;

    if (answeredQuestions[currentQuestion] || this.state.quizCompleted) {
      return;
    }

    const selectedScore = questions[currentQuestion].scores[selectedOptionIndex];

    if (this.depressionQuestions.includes(currentQuestion)) {
      this.setState((prevState) => ({
        depressionScore: prevState.depressionScore + selectedScore,
      }));
    } else if (this.stressQuestions.includes(currentQuestion)) {
      this.setState((prevState) => ({
        stressScore: prevState.stressScore + selectedScore,
      }));
    } else if (this.anxiousQuestions.includes(currentQuestion)) {
      this.setState((prevState) => ({
        anxiousScore: prevState.anxiousScore + selectedScore,
      }));
    }

    this.setState((prevState) => ({
      answeredQuestions: prevState.answeredQuestions.map((value, index) =>
        index === currentQuestion ? true : value
      ),
    }));

    if (currentQuestion < questions.length - 1) {
      this.setState({
        currentQuestion: currentQuestion + 1,
      });
    } else {
      this.setState({
        quizCompleted: true,
        chartData: {
          labels: ['Depression', 'Stress', 'Anxious'],
          datasets: [
            {
              label: 'Score',
              backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 205, 86, 0.6)'],
              borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 205, 86, 1)'],
              borderWidth: 1,
              data: [this.state.depressionScore, this.state.stressScore, this.state.anxiousScore],
            },
          ],
        },
      });
    }
  };

  render() {
    const { currentQuestion, depressionScore, stressScore, anxiousScore, questions, quizCompleted, chartData } = this.state;

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
                <li key={index} onClick={() => this.handleAnswerClick(index)}>
                  {option}
                </li>
              ))}
            </ul>
            <p>Depression Score: {depressionScore}</p>
            <p>Stress Score: {stressScore}</p>
            <p>Anxious Score: {anxiousScore}</p>
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

export default Assesment;