import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentScreen, setCurrentScreen] = useState("welcome");
  const [isReceptionistSubmitted, setIsReceptionistSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen("grid");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleGridItemClick = (screen) => {
    setCurrentScreen(screen);
  };

  const handleReceptionistSubmit = () => {
    setIsReceptionistSubmitted(true); // Mark receptionist form as submitted
  };

  return (
    <div
      className="app-container"
      style={{
        backgroundColor: "#ADD8E6",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        padding: 0,
        overflow: "hidden", // Prevent scrolling
      }}
    >
      {currentScreen === "welcome" && <WelcomeScreen />}
      {currentScreen === "grid" && <HealthcareGrid onItemClick={handleGridItemClick} />}
      {currentScreen === "receptionist" && !isReceptionistSubmitted && (
        <ReceptionistScreen onSubmit={handleReceptionistSubmit} />
      )}
      {isReceptionistSubmitted && <PatientDetailsForm />}
      {currentScreen === "doctor" && <DoctorScreen />}
      {currentScreen === "medicine" && <MedicineScreen />}
      {currentScreen === "laboratory" && <LaboratoryScreen />}
    </div>
  );
}

const WelcomeScreen = () => {
  return (
    <div
      className="welcome-container"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: 0,
        padding: 0,
      }}
    >
      <div className="title-container">
        <h1 className="title">MediFlow</h1>
      </div>
      <div className="image-container">
        <img src="/hospital image.png" alt="Hospital" className="hospital-image" />
      </div>
    </div>
  );
};

const HealthcareGrid = ({ onItemClick }) => {
  const data = [
    { image: "/receptionist.png", label: "Receptionist", screen: "receptionist" },
    { image: "/doctor.png", label: "Doctor", screen: "doctor" },
    { image: "/medicine.png", label: "Medicine", screen: "medicine" },
    { image: "/laboratory.png", label: "Laboratory", screen: "laboratory" },
  ];

  return (
    <div
      className="grid-container"
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        placeItems: "center",
        margin: 0,
        padding: 0,
      }}
    >
      {data.map((item, index) => (
        <div
          key={index}
          className="grid-item"
          onClick={() => onItemClick(item.screen)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <img
            src={item.image}
            alt={item.label}
            className="grid-image"
            style={{ width: "100px", height: "100px" }}
          />
          <p
            className="grid-label"
            style={{ marginTop: "10px", fontSize: "18px", color: "#2c3e50" }}
          >
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
};


const ReceptionistScreen = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Password:", password);
    onSubmit();
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Image with Custom URL */}
      <div
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url("receptionist background.jpeg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    filter: "brightness(2.9)", // Adjust brightness if needed
    zIndex: -1,
  }}
></div>


      {/* Semi-Transparent Overlay for Better Readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.3)", // 🔹 Adjust transparency if needed
          zIndex: -1,
        }}
      ></div>
      

      {/* Sign-In Form */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Receptionist Sign-In</h2>
        <form onSubmit={handleSubmit} style={{ width: "300px" }}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#2c3e50",
              color: "white",
              padding: "10px",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
              width: "100%",
              transition: "background 0.3s",
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};



const PatientDetailsForm = () => {
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    temp: "",
    height: "",
    weight: "",
    bp: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPatientDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Patient Details:", patientDetails);
    alert("Patient details submitted successfully!");
  };

  return (
    <div
      className="patient-details-container"
      style={{
        backgroundColor: "#f8f9fa",
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        width: "500px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h2 style={{ color: "#2c3e50", textAlign: "center" }}>Patient Details</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "10px", alignItems: "center" }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={patientDetails.name}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "10px", alignItems: "center" }}>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={patientDetails.age}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "10px", alignItems: "center" }}>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={patientDetails.gender}
            onChange={handleChange}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "10px", alignItems: "center" }}>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={patientDetails.phone}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "10px", alignItems: "center" }}>
          <label htmlFor="temp">Temp (°C):</label>
          <input
            type="number"
            id="temp"
            value={patientDetails.temp}
            onChange={handleChange}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "10px", alignItems: "center" }}>
          <label htmlFor="height">Height (cm):</label>
          <input
            type="number"
            id="height"
            value={patientDetails.height}
            onChange={handleChange}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "10px", alignItems: "center" }}>
          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="number"
            id="weight"
            value={patientDetails.weight}
            onChange={handleChange}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "10px", alignItems: "center" }}>
          <label htmlFor="bp">BP (mmHg):</label>
          <input
            type="text"
            id="bp"
            value={patientDetails.bp}
            onChange={handleChange}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#2c3e50",
            color: "white",
            padding: "10px",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
            transition: "background 0.3s",
            marginTop: "20px",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const DoctorScreen = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Doctor Name:", name);
    console.log("Password:", password);
  };

  return (
    <div
      className="screen-container"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        padding: 0,
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Doctor Sign-In</h2>
        <form onSubmit={handleSubmit} style={{ width: "300px" }}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#2c3e50",
              color: "white",
              padding: "10px",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
              width: "100%",
              transition: "background 0.3s",
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

const MedicineScreen = () => (
  <div
    className="screen-container"
    style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: 0,
      padding: 0,
    }}
  >
    <h2>Medicine Screen</h2>
  </div>
);

const LaboratoryScreen = () => (
  <div
    className="screen-container"
    style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: 0,
      padding: 0,
    }}
  >
    <h2>Laboratory Screen</h2>
  </div>
);

export default App;