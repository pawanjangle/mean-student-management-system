const mongoose = require( "mongoose" );
const studentSchema = new mongoose.Schema( {
first_name: String,
middle_name: String,
last_name: String,
address_line1: String,
address_line2: String,
address_line3: String,
city: String,
district: String,
state: String,
country: String,
pincode: Number,
gender: String,
dob: String,
mob: Number
} );
module.exports = mongoose.model( "Student", studentSchema );
