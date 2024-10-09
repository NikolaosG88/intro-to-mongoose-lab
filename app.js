const prompt = require('prompt-sync')();

//__________________________________________________//

const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Customer = require('./models/customer');

//__________________________________________________//

const connect = async () => {
    // Connect to MongoDB using the MONGODB_URI specified in our .env file.
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Call the runQueries function, which will eventually hold functions to work
    // with data in our db.
    // await runQueries()
    await menu();
    
    // Disconnect our app from MongoDB after our queries run.
    // await mongoose.disconnect();
    // console.log('Disconnected from MongoDB');
  
    // Close our app, bringing us back to the command line.
    // process.exit();
  };

const menu = () => {
    console.log( '1. Create a customer');
    console.log( '2. View all customers');
    console.log( '3. Update a customer');
    console.log( '4. Delete a customer');
    console.log( '5. Quit');
    
    const selection = parseInt(prompt('Please select one action from "1-5" to be performed '));

    if (selection === 1) {
        createCustomer();
    } else if (selection === 2) {
        viewCustomer();
    } else if (selection === 3) {
        updateCustomer();
    } else if (selection === 4) {
        deleteCustomer();
    } else if (selection === 5) {
         process.exit();
    } else if (selection >= 6 || selection === 0){
        console.log('Enter valid number according to options!')
        menu();
    } else {
        console.log('No action was chosen')
        menu();
    }
}

const createCustomer = async () => {
    const name = prompt('Enter Customer Name: ');
    const age = prompt('Enter Customer Age: ');
    const customerData = {
        name: name,
        age: age,
    };
    
    const newCustomer = await Customer.create(customerData);
    console.log('New Customer created:', newCustomer);
    menu();
}

  connect();