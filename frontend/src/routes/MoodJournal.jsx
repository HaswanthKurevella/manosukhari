import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
// import MoodCounts from './MoodCounts';

function MoodJournal() {
  const [selectedMood, setSelectedMood] = useState(''); // State to store the selected mood

  const handleMoodChange = (e) => {
    setSelectedMood(e.target.value); // Update the selected mood when the dropdown changes
  };

  const handleSubmit = () => {
    // You can perform any action with the selected mood here, e.g., send it to a server
    console.log(`User's selected mood: ${selectedMood}`);
  
    axios.post('http://localhost:8000/api/save-mood', { mood: selectedMood })
      .then((response) => {
        console.log(response.data);
        toast.success("Mood Submitted: " + selectedMood);
      })
      .catch((error) => {
        console.error('Error submitting mood:', error);
        toast.error("Error submitting mood");
      });
  };

  return (
    <div>
      <h2>Select your present mood:</h2>
      <select value={selectedMood} onChange={handleMoodChange}>
        <option value="">-- Select Mood --</option>
        <option value="happy">Happy</option>
        <option value="sad">Sad</option>
        <option value="angry">Angry</option>
        <option value="excited">Excited</option>
        <option value="calm">Calm</option>
        <option value="content">Content</option>
        <option value="surprised">Surprised</option>
        <option value="relaxed">Relaxed</option>
        <option value="confused">Confused</option>
        <option value="grateful">Grateful</option>
        {/* Add more moods here */}
      </select>
      <button onClick={handleSubmit}>Submit</button>
      <Toaster />
      {/* <MoodCounts /> */}
    </div>
    
  );
}

export default MoodJournal;