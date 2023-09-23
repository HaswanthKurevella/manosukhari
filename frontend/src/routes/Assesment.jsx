import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import './Assesment.css'
// import React, { Component } from 'react';
// import CanvasJSchart from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
import {
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

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
  const data = [
    { name: "Depression", scores: depressionScore },
    { name: "Anxiety", scores: anxiousScore },
    { name: "Stress", scores: stressScore },
];
const getDepressionStatusText = (depressionScore) => {
  if (depressionScore >= 0 && depressionScore <= 9) {
    return {
      status: 'Normal',
      suggestion: 'You\'re doing well. Keep up the positive mindset!',
    };
  } else if (depressionScore >= 10 && depressionScore <= 13) {
    return {
      status: 'Mild',
      suggestion: `Self-care and lifestyle changes:
- Regular Exercise: Engaging in physical activity can boost mood and reduce symptoms of depression.
- Healthy Diet: Eating nutritious food can have a positive impact on mental health.
- Adequate sleep: Prioritize a consistent sleep schedule to improve mood and energy levels.
- Stress management: Learn stress-reduction techniques like mindfulness, meditation, or yoga.
- Social support: Maintain connections with friends and loved ones.`,
    };
  } else if (depressionScore >= 14 && depressionScore <= 20) {
    return {
      status: 'Moderate',
      suggestion: `Simplify your life.
- Write in a journal.
- Read reputable self-help books and websites.
- Locate helpful groups.
- Don’t become isolated.
- Learn ways to relax and manage your stress.
- Structure your time.
- Don’t make important decisions when you’re down.`,
    };
  } else if (depressionScore >= 21 && depressionScore <= 27) {
    return {
      status: 'Severe',
      suggestion: `List Activities You Used To Enjoy – Include As Many As Possible.
- Creative Outlets: Engaging in creative activities like art, music, or writing can be therapeutic and help express emotions.
- Avoid making major decisions about your life at this time.
- Talking to people who are supportive.
- Nature and Outdoor Activities: Spending time in nature and engaging in outdoor activities can have a positive impact on mood and reduce depression symptoms.`,
    };
  } else {
    return {
      status: 'Extremely Severe',
      suggestion: 'Immediate professional help is strongly recommended.',
    };
  }
};

const getAnxietyStatusText = (anxietyScore) => {
  if (anxietyScore >= 0 && anxietyScore <= 7) {
    return {
      status: 'Normal',
      suggestion: 'You\'re managing anxiety well. Keep it up!',
    };
  } else if (anxietyScore >= 8 && anxietyScore <= 9) {
    return {
      status: 'Mild',
      suggestion: `1. Have a mantra, and use it every day:
   When that not-so-little voice inside starts to tell me that I’m not good enough or that I need to push myself even harder, develop a few phrases to say back which motivates me.

2. Healthy Diet: 
   Consume a balanced diet with plenty of fruits, vegetables, and whole grains. Avoid excessive caffeine and sugar intake.

3. Hobbies and Relaxation: 
   Pursue hobbies or activities you enjoy that help you relax, such as reading, painting, or gardening.

4. Social Support: 
   Stay connected with friends and loved ones. Spending time with people who support you can boost your mood.

5. Deep Breathing: 
   Incorporate deep breathing exercises into your daily routine to maintain a sense of calm and control.

Mild anxiety is common. Consider relaxation techniques.`,
    };
  } else if (anxietyScore >= 10 && anxietyScore <= 14) {
    return {
      status: 'Moderate',
      suggestion: `1. Question your thought pattern:
   Unhelpful thoughts can take root in your mind and distort the severity of the situation. One way is to challenge your fears, ask if they’re true, and see where you can regain control.

2. Use aromatherapy:
   Aromatherapy is a holistic healing treatment that uses natural plant extracts to promote health and well-being. Sometimes it’s called essential oil therapy. Aromatherapy uses aromatic essential oils medicinally to improve the health of the body, mind, and spirit. It enhances both physical and emotional health.

3. Grounding techniques:
   Grounding techniques such as journaling and the 333 rule can often help to calm immediate feelings of anxiety.
   The 333 rule involves naming three things you can see, three sounds you can hear, and interacting with three things you can touch. Writing down what’s making you anxious gets it out of your head and can make it less daunting. Reading your thoughts and feelings can help you take stock of your emotions in the immediate moment.

4. Practice focused, deep breathing:
   Measured breathing practices may help you manage immediate feelings of anxiety. Try breathing in for 4 counts and breathing out for 4 counts for 5 minutes total. By evening out your breath, you’ll slow your heart rate, which should help calm you down.

5. Exercise:
   Sometimes, the best way to stop anxious thoughts is to leave a situation and get moving. Focusing on your body and not your mind may help relieve your anxiety. Low impact exercises like walking, yoga can often help people to reduce stress and manage anxiety symptoms.

Consider talking to a therapist for support and guidance at our therapist directory.
Moderate anxiety may benefit from therapy or counseling.`,
    };
  } else if (anxietyScore >= 15 && anxietyScore <= 19) {
    return {
      status: 'Severe',
      suggestion: `List Activities You Used To Enjoy – Include As Many As Possible:
   - Creative Outlets: Engaging in creative activities like art, music, or writing can be therapeutic and help express emotions.
   - Avoid making major decisions about your life at this time.
   - Talking to people who are supportive.
   - Nature and Outdoor Activities: Spending time in nature and engaging in outdoor activities can have a positive impact on mood and reduce anxiety symptoms.`,
    };
  } else {
    return {
      status: 'Extremely Severe',
      suggestion: 'Immediate professional intervention is strongly recommended.',
    };
  }
};


const getStressStatusText = (stressScore) => {
  if (stressScore >= 0 && stressScore <= 14) {
    return {
      status: 'Normal',
      suggestion: 'You\'re managing stress well. Keep it up!',
    };
  } else if (stressScore >= 15 && stressScore <= 19) {
    return {
      status: 'Mild',
      suggestion: `
      Mindfulness Meditation: Engage in mindfulness or meditation practices to maintain a sense of calm and balance in your life. Regular meditation can help prevent stress from escalating.
      Exercise: Incorporate regular physical activity into your routine, such as walking, jogging, or yoga, to release endorphins and reduce stress.
      Healthy Eating: Maintain a balanced diet rich in fruits, vegetables, and whole grains. Proper nutrition can help regulate your mood and energy levels.
      Time Management: Use effective time management techniques to stay organized and reduce feelings of overwhelm. Prioritize tasks and set realistic goals.
      Relaxation Techniques: Practice deep breathing exercises, progressive muscle relaxation, or guided imagery to relax your body and mind.
      Social Support: Maintain strong connections with friends and family. Talking to someone you trust about your stressors can provide emotional relief.`,
    };
  } else if (stressScore >= 20 && stressScore <= 25) {
    return {
      status: 'Moderate',
      suggestion: `
      Counseling or Therapy: Consider talking to a mental health professional for guidance and support. Cognitive-behavioral therapy (CBT) and other therapeutic approaches can be effective for managing medium-level stress.
      Stress Reduction Workshops: Attend stress management workshops or courses to learn new coping strategies and stress-reduction techniques.
      Journaling: Keep a journal to express your thoughts and emotions. Writing can help you gain insights into the causes of your stress.
      Hobbies and Interests: Engage in hobbies and activities you enjoy to distract yourself from stress and promote relaxation.
      Limit Stimulants: Reduce or eliminate caffeine, nicotine, and alcohol, as they can exacerbate stress and anxiety.
      Sleep Hygiene: Ensure you get enough quality sleep each night. Establish a consistent sleep schedule and create a relaxing bedtime routine.`,
    };
  } else if (stressScore >= 26 && stressScore <= 33) {
    return {
      status: 'Severe',
      suggestion: `
      Seek Professional Help: If you're experiencing severe stress, anxiety, or depression, consult a mental health professional immediately. They can provide therapy, medication, or other interventions as necessary.
      Medication: In some cases, a doctor may prescribe medication to manage severe stress or anxiety symptoms. This should be done under medical supervision.
      Support Groups: Join a support group for individuals facing similar stressors or challenges. Sharing experiences and coping strategies with others can be comforting.
      Delegate or Prioritize: When stress is overwhelming, consider delegating tasks or responsibilities to others and focusing only on essential priorities.
      Self-Care: Prioritize self-care activities, including regular exercise, a balanced diet, and relaxation techniques, to build resilience and combat high stress.
      Workplace Support: If workplace stress is a significant factor, discuss your concerns with your supervisor or human resources department. They may be able to make accommodations or offer support.
      Severe stress can impact your well-being. Seek support.`,
    };
  } else {
    return {
      status: 'Extremely Severe',
      suggestion: 'Immediate professional help is strongly recommended.',
    };
  }
};



const fixedData = data.map((item) => ({
  name: item.name,
  scores: item.scores,
  fixedScores: item.scores * 5, // Assuming each score difference corresponds to 5 units on the graph
}));


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
    depressionScore: depressionScore * 2,
    stressScore: stressScore * 2,
    anxiousScore: anxiousScore * 2,
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
          {/* <p>Depression Score: {depressionScore}</p>
          <p>Stress Score: {stressScore}</p>
          <p>Anxious Score: {anxiousScore}</p> */}
          {console.log(data)}
          <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="scores" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
        <div className='result'>
  <p><b>Depression Status:</b> {getDepressionStatusText(depressionScore).status}</p>
  <p>Suggestion: {getDepressionStatusText(depressionScore).suggestion}</p>
</div>
<div className='result'>
  <p><b>Anxiety Status:</b> {getAnxietyStatusText(anxiousScore).status}</p>
  <p>Suggestion: {getAnxietyStatusText(anxiousScore).suggestion}</p>
</div>
<div className='result'>
  <p><b>Stress Status:</b> {getStressStatusText(stressScore).status}</p>
  <p>Suggestion: {getStressStatusText(stressScore).suggestion}</p>
</div>


          <div>
            {/* <h3>Score Summary</h3> */}
            {/* <CanvasJSchart
              options={{
                animationEnabled: true,
                title: {
                  text: 'Score Summary',
                },
                data: [
                  {
                    type: 'column',
                    dataPoints: [
                      { x: 'Depression', y: depressionScore },
                      { x: 'Stress', y: stressScore },
                      { x: 'Anxious', y: anxiousScore },
                    ],
                  },
                ],
              }}
            /> */}

          </div>

        </div>
      ) : (
        <div>
          <div className='options'>
          <h2>Question {currentQuestion + 1}</h2>
          <p>{questions[currentQuestion].question}</p>
          <ul>
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index} onClick={() => handleAnswerClick(index)}>
                {option}
              </li>
            ))}
          </ul>
          </div>
          {/* <p>Depression Score: {depressionScore}</p>
          <p>Stress Score: {stressScore}</p>
          <p>Anxious Score: {anxiousScore}</p> */}
          {/* {currentQuestion === questions.length - 1 && (
            // <button onClick={() => setQuizCompleted(true)}>Submit</button>
          )} */}
        </div>
      )}
    </div>
  );
}

export default Assessment;
