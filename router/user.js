const express = require( "express" );
const router = express.Router();
const User = require( "../model/user" );
const verify = require("./verifytoken.js");
const bcrypt = require( "bcryptjs" );
const jwt = require( "jsonwebtoken" );
router.post( "/user", async ( req, res ) =>{
const emailExist = await User.findOne( {email: req.body.email} );
if( emailExist )
return res.status( 400 ).send( "email already exist");
const salt = await bcrypt.genSalt( 10 );
const hashedPassword = await bcrypt.hash( req.body.password, salt );
const newUser = new User( {
first_name: req.body.first_name,
last_name: req.body.last_name,
email: req.body.email,
password: hashedPassword
} );
await newUser.save( ( err, user ) =>{
 if( err )
 {
 res.json( {message: "failed to add user"} )
 }
 else{
 res.json( {message: "user added successfull"} )
 }
 } );
 });
router.get( "/user", async ( req, res ) =>{
try{
const users= await User.find();
res.json( users);
}
catch( error ){
res.json( {message:error} );
}
});
router.delete( "/:userId", async ( req, res ) =>{
try{
const removeUser= await User.findByIdAndDelete(req.params.userId);
res.json( removeUser);
}
catch ( error ){
res.json( {message:error} );
}
});
router.post( "/login", async ( req, res )=>{
const user = await User.findOne( {email: req.body.email} );
if( !user )
return res.status( 400 ).send( "Email is wrong" );
const validPass= await bcrypt.compare( req.body.password, user.password);
if( !validPass )
return res.status( 400 ).send( "invalid password" );
const token_secret = "abcd";
token = await jwt.sign( {_id: user._id} , token_secret);
res.header("auth-token", token ).send( {token: token} );
} );
router.get( "/dashboard", verify, ( req, res ) => {
res.send( "dashboard")}
);

module.exports = router;