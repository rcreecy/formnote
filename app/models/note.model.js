const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    summary: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);
