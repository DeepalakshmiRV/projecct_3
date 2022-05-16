const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
    messages:{
        type : String,
        required:true
    }
     
    
});
const Msg = mongoose.model('messages',msgSchema);
module.exports = Msg;
