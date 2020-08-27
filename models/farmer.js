const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const farmerSchema = new Schema({
    firstName: {
        type: String,
        uppercase: true,
        required: true
    },
    lastName: {
        type: String,
        uppercase: true,
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    sex: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        default: null
    },
    village: {
        type: String,
        required: true
    },
    block: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    role: {
        type: String
    }
});

farmerSchema.plugin(passportLocalMongoose, {usernameField: 'mobile'});
const Farmer = module.exports = mongoose.model('Farmer', farmerSchema);