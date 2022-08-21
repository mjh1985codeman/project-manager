const mongoose = require('mongoose');

//mongoose schema (database => mongoose (mapper) => graphQLAPI)
const ProjectMongooseSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Potential','Quote-Delivered', 'In-Progress', 'Complete', 'Cancelled', 'Delayed']
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
    }
});

module.exports = mongoose.model('Project', ProjectMongooseSchema);