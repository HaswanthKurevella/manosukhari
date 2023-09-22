import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import "./styles/TherapistReg.css";

const FbReceived = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    // Fetch feedback data from the server
    axios.get('http://localhost:8000/api/get-feedbacks')
      .then((response) => {
        setFeedbackData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching feedback:', error);
      });
  }, []);

  return (
    <div>
      <h1>Received Feedbacks</h1>
      <table className="feedback-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {feedbackData.map((feedback, index) => (
            <tr key={index}>
              <td>{feedback.title}</td>
              <td>{feedback.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FbReceived;