const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    from_user: String,
    room: String,
    message: String,
    date_sent: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);