const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cropSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    sell: {
        type: String,
        required: true
    },
    buy: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    variety: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Crop = module.exports = mongoose.model('Crop', cropSchema);