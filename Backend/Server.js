const mongoose= require('mongoose');
const express= require('express');
const bodyParser= require('body-parser');
const mongoose= require('mongoose');

const app=express();
app.use(corse());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/digital-mess-card', {  //Mongodb connection
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.get('/',(req,res)=>{
    res.send('Digital MESS Card');      //Route
});

const PORT= 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})