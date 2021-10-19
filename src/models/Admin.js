const mongoose = require('mongoose');

let AdminSchema = mongoose.Schema({
    _id: Number,
    tg_id: Number,
    tg_username: String,
    tg_name: String,
    ch_ids: Array,
    type: String,
    isWork: Boolean,
    created: { 
        type: Date,
        default: Date.now
    }
}, { _id: false, versionKey: false });

let Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;