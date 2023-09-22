import React, { useState } from 'react';
import './styles/Feedback.css';
function Feedback() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can send the feedback data to your backend or perform any other action with it
    console.log('Title:', title);
    console.log('Description:', description);

    // Clear the form fields after submission
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          ></textarea>
        </div>
        <div>
          <button type="submit">Submit Feedback</button>
        </div>
      </form>
    </div>
  );
}

export default Feedback;
