import React from 'react';
import QrReader from 'react-qr-reader';
import './QRScanner.css';

const QRScanner = ({ onScan }) => {
    const handleScan = (data) => {
        if (data) {
            onScan(data);
        }
    };

    const handleError = (err) => {
        console.error('QR Scanner error:', err);
    };

    return (
        <div className="qr-scanner">
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
            />
        </div>
    );
};

export default QRScanner;