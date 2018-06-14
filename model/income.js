var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var incomeSchema = new Schema({
    explain:{
        type: String,
        required: 'tozihate income'
    },
    cdate:{
        type: Date,
        default: Date.now
    },
    meghdar:{
        type: Number,
        required: 'meghdare income ra vared konid',
        min: [1, 'Too few']
    },
    userid: { type: Schema.Types.ObjectId, ref: 'user' } 
});

module.exports = mongoose.model('income',incomeSchema); // mongoose.model('<custom-name>', <name of new Schema>);