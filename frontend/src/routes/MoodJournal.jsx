import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function MoodJournal() {
  const [selectedMood, setSelectedMood] = useState(''); // State to store the selected mood

  const handleMoodChange = (e) => {
    setSelectedMood(e.target.value); // Update the selected mood when the dropdown changes
  };

  const handleSubmit = () => {
    // You can perform any action with the selected mood here, e.g., send it to a server
    console.log(`User's selected mood: ${selectedMood}`);
    toast.success("Mood Submitted: " + selectedMood)
    // Add your logic for handling the mood selection here
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
    </div>
  );
}

export default MoodJournal;
