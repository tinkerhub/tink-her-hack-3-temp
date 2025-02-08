const jwt= require('jsonwebtoken');

const authenticate= (req,res,next) => {                               //Authenticate access
    const token=req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied');

    try{
        const decoded= jwt.verify(token, 'secret_key');
        req.userId= decoded.userId;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};

module.exports= { authenticate };