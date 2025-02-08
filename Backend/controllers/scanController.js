const Scan= require('../models/Scan');

exports.scan= async (req, res) => {         //to get info about user and the current time
    const { type } = req.body;
    const userId = req.userId;

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    if (type === 'lunch' && !(hours >= 11 && minutes >= 30 && hours < 14)) {            //to check whether scanning of lunch time is valid
        return res.status(400).json({ error: 'Lunch scanning is only allowed between 11:30 AM and 2:00 PM' });
    }

    if (type === 'snack' && !(hours >= 15 && minutes >= 30 && hours < 17)) {            //to check whether scanning of snack time is valid
        return res.status(400).json({ error: 'Snack scanning is only allowed between 3:30 PM and 5:00 PM' });
    }

    try {
        const existingScan = await Scan.findOne({ userId, type, date: { $gte: new Date().setHours(0, 0, 0, 0) } });
        if (existingScan) {
            return res.status(400).json({ error: 'Already scanned today' });             //to check whether a scanning already occured in the given time
        }

        const scan = new Scan({ userId, type });
        await scan.save();                                              //to save current scan
        res.json({ message: 'Scan successful' });                       
    } catch (err) {
        res.status(500).json({ error: 'Error processing scan' });
    }
};