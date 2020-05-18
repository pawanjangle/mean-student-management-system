const express = require( "express" );
const router = express.Router();
const verify = require("./verifytoken.js");
const Student = require( "../model/student" );
router.post( "/add-student", verify, async ( req, res ) =>{
const newStudent = new Student( {
first_name: req.body.first_name,
middle_name: req.body.middle_name,
last_name: req.body.last_name,
address_line1: req.body.address_line1,
address_line2: req.body.address_line2,
address_line3: req.body.address_line3,
city: req.body.city,
district: req.body.district,
state: req.body.state,
country: req.body.country,
pincode: req.body.pincode,
gender: req.body.gender,
dob: req.body.dob,
mob: req.body.mob
} );
await newStudent.save( ( err ) =>{
 if( err )
 {
 res.json( {message: "failed to add student"} )
 }
 else{
 res.json( {message: "student added successfully"} )
 }
 } );
 });
router.get( "/all-students", verify,
async ( req, res ) =>{
try{
const students= await Student.find();
res.json( students);
}
catch( error ){
res.json( {message:error} );
}
});
router.get("/:studentId",  async ( req, res )=>{
try{
const student = await Student.findById( req.params.studentId );
res.json( student )
}
catch( error ){
res.json( {message: error} );
}
});
router.put("/:studentId",  async ( req, res ) =>{
try{
const student = {
first_name: req.body.first_name,
middle_name: req.body.middle_name,
last_name: req.body.last_name,
address_line1: req.body.address_line1,
address_line2: req.body.address_line2,
address_line3: req.body.address_line3,
city: req.body.city,
district: req.body.district,
state: req.body.state,
country: req.body.country,
pincode: req.body.pincode,
gender: req.body.gender,
dob: req.body.dob,
mob: req.body.mob
};
const updatedStudent = await Student.findByIdAndUpdate( {_id: req.params.studentId}, student );
res.json( updatedStudent );
}
catch( error ){
res.json( {message: error} );
}

});
router.delete( "/:studentId", async ( req, res ) =>{
try{
const removeStudent= await Student.findByIdAndDelete(req.params.studentId);
res.json( removeStudent);
}
catch ( error ){
res.json( {message:error} );
}
});


module.exports = router;