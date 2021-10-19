const mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
    _id: Number,
    tg_id: Number,
    tg_username: String,
    tg_name: String,
    fake_name: {
        type: String,
        default: this.tg_name
    },
    ch_id: String,
    status: String,
    isWork: Boolean,
    created: { 
        type: Date,
        default: Date.now
    }
}, { _id: false, versionKey: false });

UserSchema.pre('save', function (next) {
    this.fake_name = this.get('tg_name'); // considering _id is input by client
    next();
});

let User = mongoose.model('User', UserSchema);
module.exports = User;