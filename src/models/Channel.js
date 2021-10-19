const mongoose = require('mongoose');

let ChannelSchema = mongoose.Schema({
    _id: Number,
    ch_id: Number,
    ch_name: String,
    admins_id: Array,
    isWork: Boolean,
    created: { 
        type: Date,
        default: Date.now
    }
}, { _id: false, versionKey: false });

let Channel = mongoose.model('Channel', ChannelSchema);
module.exports = Channel;