const mongoose = require('mongoose');
const {getConnection} = require('../../config/database');

const Template = mongoose.Schema({
    name: { type: String, required: false },
    date: { type: String, required: true },
    exercises: { type: Array, required: true },
    categories: { type: Array, requires: true },
    description: { type: String, required: false }
});

module.exports = getConnection('coal').model('Template', Template);