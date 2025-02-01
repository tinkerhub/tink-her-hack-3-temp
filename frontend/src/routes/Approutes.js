import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import About from "../pages/About";
import Organisations from "../pages/Organisations";
import Register from "../pages/Register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/organisations" element={<Organisations />} />
      <Route path="/register-donor" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
