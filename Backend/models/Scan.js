const mongoose= require('mongoose');
const scanSchema =new mongoose.Schema({                                     //Scan date update in db
    userId: {   type: String, enum: ['lunch', 'snck'], required: true },
    date :{  type: Date, default: Date.now},
});

module.exports= mongoose.model('Scan', scanSchema);