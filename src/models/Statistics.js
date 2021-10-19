const mongoose = require('mongoose');

let StatSchema = mongoose.Schema({
    _id: Number,
    ch_id: Number,
    statistics: [{
        date: String,
        timeStamp: {type: Date, default: Date.now},
        usersStat: [{
            tg_id:  Number,
            status: String,
            time: String
        }]
    }]
}, { _id: false, versionKey: false });

let Stat = mongoose.model('Statistics', StatSchema);
module.exports = Stat;