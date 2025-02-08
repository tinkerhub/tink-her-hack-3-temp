import React from 'react';
import Lunch from '../Lunch/Lunch';
import Snack from '../Snack/Snack';
import './Dashboard.css';

const Dashboard = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
            <Lunch />
            <Snack />
        </div>
    );
};

export default Dashboard;