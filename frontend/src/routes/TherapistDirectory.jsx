import icon from "./icon.png";
import "./TherapistDirectory.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TherapistDirectory() {
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    // Make an API request to get therapist data
    axios.get('/api/therapists')
      .then((response) => {
        setTherapists(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching therapists:', error);
      });
  }, []);

  return (
    <div className="doctor-list">
      <h1>Therapist Directory</h1>
      <div className="card-container">
        {therapists.map((therapist) => (
          <div className="card" key={therapist._id}>
            <img
              style={{ width: "128px", height: "128px" }}
              src={icon}
              alt={`Profile pic of ${therapist.username}`}
            />
            <div className="desc">
              <h1 style={{ whiteSpace: "nowrap" }}>{therapist.username}</h1>
              <p>Email: {therapist.email}</p>
              <p>Mobile: {therapist.mobileNumber}</p> {/* Use mobileNumber instead of mobile */}
              <p>Qualification: {therapist.qualification}</p>
              {/* You might not want to display the password field */}
              {/* <p>Password: {therapist.password}</p> */}
              <button className="book">Book Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TherapistDirectory;
