import React, { useState } from 'react';
import QRScanner from '../QRScanner/QRScanner';
import { scan } from '../../utils/api';
import beepSound from '../../assets/beep.mp3';

const Lunch = () => {
    const [scanned, setScanned] = useState(false);

    const handleScan = async (data) => {
        try {
            await scan('lunch', localStorage.getItem('token'));
            setScanned(true);
        } catch (err) {
            new Audio(beepSound).play();
            alert(err.message);
        }
    };

    return (
        <div className="lunch-container">
            <h2>Lunch</h2>
            {!scanned ? (
                <QRScanner onScan={handleScan} />
            ) : (
                <p>Lunch scanned successfully!</p>
            )}
        </div>
    );
};

export default Lunch;