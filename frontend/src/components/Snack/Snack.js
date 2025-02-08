import React, { useState } from 'react';
import QRScanner from '../QRScanner/QRScanner';
import { scan } from '../../utils/api';
import beepSound from '../../assets/beep.mp3';

const Snack = () => {
    const [scanned, setScanned] = useState(false);

    const handleScan = async (data) => {
        try {
            await scan('snack', localStorage.getItem('token'));
            setScanned(true);
        } catch (err) {
            new Audio(beepSound).play();
            alert(err.message);
        }
    };

    return (
        <div className="snack-container">
            <h2>Snack</h2>
            {!scanned ? (
                <QRScanner onScan={handleScan} />
            ) : (
                <p>Snack scanned successfully!</p>
            )}
        </div>
    );
};

export default Snack;