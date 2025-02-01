import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    contact: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Donor Registered:", formData);
  };

  return (
    <div className="page">
      <h1>Register as a Donor</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact Details" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
