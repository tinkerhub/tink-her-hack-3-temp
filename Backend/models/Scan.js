const mongoose= require('mongoose');
const scanSchema =new mongoose.Schema({                                     //Scan date update in db
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {   type: String, enum: ['lunch', 'snack'], required: true },
    date :{  type: Date, default: Date.now},
});

module.exports= mongoose.model('Scan', scanSchema);