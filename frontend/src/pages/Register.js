import React, { useState } from "react";
import "../styles/register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    contact: "",
    email: "",
    address: "",
    medicalHistory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const donorData = {
      name: formData.name,
      age: formData.age,
      contact: formData.contact,
      email: formData.email,
      address: formData.address,
      medicalHistory: formData.medicalHistory,
    };

    try {
      const response = await fetch('http://localhost:8000/donor/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donorData),
      });

      if (response.ok) {
        alert('Donor registered successfully!');
      } else {
        const data = await response.json();
        alert(data.detail);
      }
    } catch (error) {
      console.error('Error during donor registration:', error);
      alert('An error occurred.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register as Donor</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <textarea
          name="medicalHistory"
          placeholder="Medical History (Optional)"
          value={formData.medicalHistory}
          onChange={handleChange}
        />
        <button type="submit">Register as Donor</button>
      </form>
    </div>
  );
};

export default Register;
