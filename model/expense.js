var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expenseSchema = new Schema({
    explain:{
        type: String,
        required: 'tozihate expense'
    },
    cdate:{
        type: Date,
        default: Date.now
    },
    meghdar:{
        type: Number,
        required: 'meghdare expense ra vared konid',
        min: [1, 'Too few']
    }, 
    userid: { type: Schema.Types.ObjectId, ref: 'user' }
});

module.exports = mongoose.model('expense',expenseSchema); 