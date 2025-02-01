import React, { useState } from "react";
import '../styles/register.css'; 

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    contact: "",
    address: "",
    bloodType: "",
    medicalHistory: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Donor Registered:", formData);
    
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1 className="form-title">Register as a Donor</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="18"
                  max="65"
                  required
                />
              </div>

              <div className="form-group">
                <label>Blood Type</label>
                <select 
                  name="bloodType" 
                  value={formData.bloodType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Medical History (if any)</label>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                placeholder="List any existing medical conditions or allergies"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Register Now
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;