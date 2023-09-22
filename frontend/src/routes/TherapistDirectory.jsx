import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TherapistForm = () => {
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/therapists') // Corrected API endpoint
      .then((response) => {
        setTherapists(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching therapist data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Therapist Data Form</h1>
      <form>
        <table className="therapist-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Qualification</th> {/* Corrected field name */}
              <th>Email</th> {/* Corrected field name */}
            </tr>
          </thead>
          <tbody>
            {therapists.map((therapist, index) => (
              <tr key={index}>
                <td>{therapist.username}</td>
                <td>{therapist.qualification}</td>
                <td>{therapist.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default TherapistForm;