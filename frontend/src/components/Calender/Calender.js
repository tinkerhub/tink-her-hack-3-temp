import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

const CustomCalendar = ({ scans }) => {
    const tileClassName = ({ date }) => {
        const scan = scans.find((s) => new Date(s.date).toDateString() === date.toDateString());
        if (scan) {
            return scan.type === 'lunch' ? 'green' : 'brown';
        }
        return null;
    };

    return (
        <div className="calendar-container">
            <Calendar tileClassName={tileClassName} />
        </div>
    );
};

export default CustomCalendar;