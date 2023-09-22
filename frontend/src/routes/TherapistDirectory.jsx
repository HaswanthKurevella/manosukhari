import icon from "F:/sih/manosukhari/frontend/src/routes/icon.png";
import "./TherapistDirectory.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';



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
              <p>Mobile: {therapist.mobile}</p>
              <p>Qualification: {therapist.qualification}</p>
              <button className="book">Book Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

export default TherapistDirectory;
