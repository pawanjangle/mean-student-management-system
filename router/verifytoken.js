const jwt = require( "jsonwebtoken" );
module.exports = async ( req, res, next ) =>{
const token = req.header( "auth-token" );
if( !token ) return res.status( 400 ).send( "Access Denied" );
try{
const verified =await jwt.verify( token, process.env.TOKEN_SECRET );
req.user = verified;
next();
}
catch( error ){
res.status( 400 ).send( "Invalid token" );
}
}