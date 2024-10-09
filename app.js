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
     menu();
    
    // Disconnect our app from MongoDB after our queries run.
    // await mongoose.disconnect();
    // console.log('Disconnected from MongoDB');
  
    // Close our app, bringing us back to the command line.
    // process.exit();
  };

const menu = () => {
    console.log( '1. Create a customer');
    console.log( '2. View all customers');
    console.log( '3. Find Customer');
    console.log( '4. Update a customer');
    console.log( '5. Delete a customer');
    console.log( '6. Quit');
    
    const selection = parseInt(prompt('Please select one action from "1-5" to be performed '));

    if (selection === 1) {
        createCustomer();
    } else if (selection === 2) {
        viewCustomer();
    } else if (selection === 3) {
        findCustomer();
    } else if (selection === 4) {
        updateCustomer();
    } else if (selection === 5) {
        deleteCustomer();
    } else if (selection === 6) {
         process.exit();
    } else if (selection >= 7 || selection === 0){
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

const viewCustomer = async () => {
    const customers = await Customer.find({})
    console.log('All customers;', customers);
    menu();
}

const findCustomer = async () => {
   let choice = prompt('How you want to access info by Name or Age?: ').toLowerCase();;
    let customer

    if (choice === 'exit') {
         menu();
    }
   
    if (choice === 'name') {
        const name = prompt('Enter Customer Name: ');
        if (name === 'exit') {
            menu();
        }
        customer = await Customer.find({ name: name });
    } else if ( choice === 'age') {
        let age = prompt('Enter Customer Age: ');
        if (age === 'exit') {
            menu();
        }
        age = parseInt(age);
        customer = await Customer.find({ age: age })
    } else if (choice !== 'name' || 'age') {
        console.log('Please read instructions again!')
       return findCustomer();
    }

    console.log('Customer found:', customer);
    menu();
}

const updateCustomer = async () => {
    const customers = await Customer.find({})
    console.log('All customers;', customers);
   let crmUpdate = prompt('Please advise customer ID: ');
   let newName = prompt('Please advise new name: ');
   let newAge = parseInt(prompt('Please advise new age: '));
   let updateCrm = await Customer.findByIdAndUpdate(
    crmUpdate, {
        name: newName,
        age: newAge,
    }, {new: true});

    console.log('Updated customer:', updateCrm);
    menu();    
};

const deleteCustomer = async () => {
    const id = prompt('Enter Customer Id to be deleted: ');
    const removedCustomer = await Customer.findByIdAndDelete(id);
    console.log('Removed Customer:', removedCustomer);
    menu();
    }

  connect();
  