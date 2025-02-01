import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import About from "../pages/About";
import OrganisationsList from "../pages/OrganisationsList";
import RegisterDonor from "../pages/RegisterDonor";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/organisations" element={<OrganisationsList />} />
      <Route path="/register-donor" element={<RegisterDonor />} />
    </Routes>
  );
}

export default AppRoutes;
