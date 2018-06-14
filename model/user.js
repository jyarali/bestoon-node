var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({ 
    name:{
        type: String
    },
    email:{
        type: String,
        required: 'Please Enter your E-mail address',
        unique: true
    },
    password:{
        type: String,
        required: 'Please Enter your Password' 
    }
    // ,
    // token:{
    //     type: String,
    //     required: 'No Token!'
    // }
      
});

module.exports = mongoose.model('user',userSchema);