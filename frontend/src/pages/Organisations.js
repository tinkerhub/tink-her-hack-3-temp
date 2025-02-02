import React, { useState } from "react";
import "../styles/organisations.css";

const organisationsData = [
  {
    id: 1,
    name: "Org 1",
    description: "Helping cancer patients",
    image: "/images/ngo.jpg",
    emergency: true,
    patientsHelped: 500,
  },
  {
    id: 2,
    name: "Org 2",
    description: "Cancer support group",
    image: "/images/ngo.jpg",
    emergency: false,
    patientsHelped: 300,
  },
  {
    id: 3,
    name: "Org 3",
    description: "Providing organs for patients",
    image: "/images/ngo.jpg",
    emergency: false,
    patientsHelped: 200,
  },
  {
    id: 4,
    name: "Org 4",
    description: "Mental health awareness",
    image: "/images/ngo.jpg",
    emergency: true,
    patientsHelped: 150,
  },
];

const Organisations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedOrg, setSelectedOrg] = useState("");

  // Filter organisations based on search input
  const filteredOrganisations = organisationsData.filter((org) =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort organisations based on selected criteria
  const sortedOrganisations = [...filteredOrganisations].sort((a, b) => {
    if (sortOption === "emergency") return b.emergency - a.emergency;
    if (sortOption === "patients") return b.patientsHelped - a.patientsHelped;
    return 0;
  });

  return (
    <div className="organisations-container">
      <h1 className="organisations-title">Registered Organisations</h1>
      
      {/* Search and Sort Controls */}
      <div className="search-sort-container">
        <input
          type="text"
          placeholder="Search organisations..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select
          className="sort-dropdown"
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="emergency">Emergency Cases</option>
          <option value="patients">Patients Helped</option>
        </select>

        <select
          className="org-dropdown"
          value={selectedOrg}
          onChange={(e) => setSelectedOrg(e.target.value)}
        >
          <option value="">Select Organisation</option>
          {sortedOrganisations.map((org) => (
            <option key={org.id} value={org.name}>
              {org.name}
            </option>
          ))}
        </select>
      </div>

      {/* Display organisations */}
      <div className="organisations-grid">
        {sortedOrganisations.map((org) => (
          <div key={org.id} className="organisation-card">
            <img src={org.image} alt={org.name} className="organisation-image" />
            <h2 className="organisation-name">{org.name}</h2>
            <p className="organisation-description">{org.description}</p>
            <p className="organisation-info">
              <strong>Emergency:</strong> {org.emergency ? "Yes" : "No"}
            </p>
            <p className="organisation-info">
              <strong>Patients Helped:</strong> {org.patientsHelped}
            </p>
            <button className="organisation-button">Click More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Organisations;
