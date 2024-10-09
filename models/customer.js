
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

//Lets compile the schema into a model

const Customer = mongoose.model('Customer', customerSchema);

//Lastly, lets export the compiled model
module.exports = Customer;