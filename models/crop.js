const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cropSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Crop = module.exports = mongoose.model('Crop', cropSchema);