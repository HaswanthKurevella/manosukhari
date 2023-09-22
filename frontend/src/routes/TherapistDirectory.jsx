import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TherapistDirectory.css";

const TherapistForm = () => {
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/therapists") // Corrected API endpoint
      .then((response) => {
        setTherapists(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching therapist data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Therapist Data Form</h1>

      <table className='therapist-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Qualification</th> {/* Corrected field name */}
            <th>Email</th> {/* Corrected field name */}
            <th>Appointment</th>
          </tr>
        </thead>
        <tbody>
          {therapists.map((therapist, index) => (
            <tr key={index}>
              <td>{therapist.username}</td>
              <td>{therapist.qualification}</td>
              <td>{therapist.email}</td>
              <td>
                <form
                  action='https://wa.me/918374136940?text=Hello%2CI%20would%20Like%20to%20book%20an%20appointment%20for%20Therapy%20Session.%0Acan%20you%20please%20intimate%20me%20your%20free%20slots%3F'
                  method='get'
                  target='_blank'
                >
                  <button type='submit'>Book Appointment</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TherapistForm;
