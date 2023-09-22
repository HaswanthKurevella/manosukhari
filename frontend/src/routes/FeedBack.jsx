import React, { useState } from 'react';
import './styles/Feedback.css';
import axios from 'axios'; // Import axios
import toast, { Toaster } from 'react-hot-toast';


const Feedback = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/feedback', {
        title, // Ensure that 'title' is included in the request body
        description,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       body: JSON.stringify({ title, description }),
      });

      if (response.status === 201) {
        console.log('Feedback saved successfully');
        setTitle('');
        setDescription('');
        toast.success("Feedback Submitted");

      } else {
        console.error('Error saving feedback');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
          <Toaster />
        </div>
      </form>
    </div>
  );
};

export default Feedback;
