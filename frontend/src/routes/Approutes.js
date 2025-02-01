import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import About from "../pages/About";
import Organisations from "../pages/Organisations";
import Register from "../pages/Register";
import CancerInfo from "../pages/CancerInfo";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/organisations" element={<Organisations />} />
      <Route path="/registerdonor" element={<Register />} />
      <Route path="/cancerinfo" element={<CancerInfo />} />
    </Routes>
  );
};

export default AppRoutes;
