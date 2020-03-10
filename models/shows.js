const mongoose = require('mongoose');

const showNames = mongoose.Schema({
  name: { type: String, default: '' },
  brand: { type: String, default: '' },
  image: { type: String, default: 'default.png' },
  fans: [
    {
      username: { type: String, default: '' },
      email: { type: String, default: '' }
    }
  ]
});

module.exports = mongoose.model('show', showNames);
