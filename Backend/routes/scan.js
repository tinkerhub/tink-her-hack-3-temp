const express= require('express');
const Scan= require('../models/Scan');
const {authenticate}=require('../middleware/auth');

const router=express.Router();
router.post('/scan',authenticate, async(req,res)=> {                            //to get info about user and the current time
    const {type}= req.body;
    const userId=req.userId;
    const now= new Date();
    const hours= now.getHours();
    const minutes=now.getMinutes();

    if(type==='lunch' && !(hours>=11 && minutes>=30 && hours<14)){             //to check whether scanning of lunch time is valid
        return res.status(400).send('Lunch sacnning is only allwed between 11:30 AM and 2:00 PM');
    }

    if(type=== 'snack' && !(hours>=15 && minutes>=30 && hours<17)){            //to check whether scanning of snack time is valid
        return res.status(400).send('Snack scanning is only allowed between 3:30 PM and 5:00 PM');
    }
    const existingScan=await Scan.findone({ userId, type, date: { $gte: new Date().setHours(0,0,0,0)}});
    if (existingScan){                                                         //to check whether a scanning already occured in the given time
        return res.status(400).send('Already scanned today');
    }
    const scan= new scan({userId, type});
    await scan.save();                                                          //to save current scan
    res.send('Scan successful');
});

module.exports= router;