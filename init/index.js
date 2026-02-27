const mongoose = require("mongoose");//for mongoose
const initdata = require("./data.js");// for requiring data.js
const Listing = require("../models/listing.js");// for requiring listing.js

main()// for mongoose
  .then(() => {
    console.log("Connected to db");
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}//for mongoose 

//this is a function for deleting the previously stored data from db and adding new one form the data.js file.
const initDB = async () => {
  await Listing.deleteMany({});
  initdata.data = initdata.data.map((obj) => ({ ...obj, owner: "698aef0b5c4f877b7686eed4" }))
  await Listing.insertMany(initdata.data);
  console.log("data was initialised");
};

initDB();//function called here.

//the index.js file in init folder is created to initialise the data from data.js to the database, so that it can be fetched by app.js 