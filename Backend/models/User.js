const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({                            //login details connected to db
    username:{ type: String, required: true, unique: true },
    password:{ type: String, required: true, match:/^[a-zA-Z0-9]+$/,
    }
});
module.exports= mongoose.model('User', userSchema);