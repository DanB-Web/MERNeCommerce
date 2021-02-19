/*
Note that this script is essentially seperate from our server
This is why we have to import everything we need (mongoose, dotenv etc...)
*/

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import users from './data/users.js';
import products from './data/products.js';

import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';       //<-- Not seeded but want to be able to drop

import connectDB from './config/db.js';

dotenv.config();

//Connect to DB
connectDB();

const importData = async () => {
  try { 
    //Clear existing db
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    //Add all seed users to db
    const createdUsers = await User.insertMany(users);
    
    //get admin user and link to products as the user prop (i.e. who added product)
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser }
    });

    //Add all seed products to db
    await Product.insertMany(sampleProducts);

    //Successful seed
    console.log('Data imported'.green.inverse);
    process.exit();

  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
}

const destroyData = async () => {
  try { 
    //Clear existing db
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    //Successful seed
    console.log('Data removed!'.green.inverse);
    process.exit();

  } catch (err) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
}

//When the script is run, we can choose to destroy or import data:
//scripts are in package.json
//npm run data:import
//npm run data:destroy
//process.argv gets the flag passed to the command line
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}