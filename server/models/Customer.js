const mongoose = require('mongoose');

//mongoose schema (database => mongoose (mapper) => graphQLAPI)
const CustomerMongooseSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    }
});

module.exports = mongoose.model('Customer', CustomerMongooseSchema);