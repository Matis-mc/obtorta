const mongoose = require('mongoose');
const {getConnection} = require('../../config/database');

const subscriptionSchema = new mongoose.Schema({
  endpoint: {
    type: String,
    required: true,
    unique: true
  },
  keys: {
    p256dh: String,
    auth: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = getConnection('commons').model('Subscription', subscriptionSchema);