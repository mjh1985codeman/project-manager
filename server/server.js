const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const schema = require('./schemas/schema');
const PORT = process.env.PORT || 5000
const {graphqlHTTP} = require('express-graphql');

const app = express();
//connecting to Database: 
connectDB();
//creating the graphql route so we can use our graphql tool. 
app.use('/graphql', graphqlHTTP({
    //bring in the schema.
schema,
    //use the graphiql tool but only when the environment is development via the package.json file.
graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(PORT, console.log(`Server is running on port ${PORT}`))