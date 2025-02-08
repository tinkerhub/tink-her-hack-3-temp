require('dotenv').config();
const express= require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const scanRoutes= require('./routes/scan');

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/scan', scanRoutes);



app.get('/',(req,res)=>{
    res.send('Digital MESS Card');      //Route
});

const PORT= process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});