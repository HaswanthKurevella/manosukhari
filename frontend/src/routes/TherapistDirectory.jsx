import icon from "H:/manosukhari/frontend/src/routes/icon.png";
import "./TherapistDirectory.css";
const TherapistDirectory = () => {
  return (
    <>
      <div className="doctor-list">
        <div className="card">
          <img
            style={{ width: "128px", height: "128px" }}
            src={icon}
            alt="Profile pic of doctor"
          />
          <div className="desc">
            <h1 style={{ whiteSpace: "nowrap" }}>Dr. Lorem.</h1>
            <p>Lorem ipsum dolor sit amet.</p>
            <button className="book">Book Appointment</button>
          </div>
          
        </div>
        
      </div>
    </>
  );
};

export default TherapistDirectory;
