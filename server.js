const express = require( "express" );
const app = express(  );
const bodyparser = require( "body-parser" );
const studentRoute = require( "./router/student" );
const userRoute = require( "./router/user" );
require( "dotenv" ).config();
const http = require( "http" );
const path = require ("path");
const cors = require( "cors" );
const mongoose = require( "mongoose" );
mongoose.connect( "mongodb+srv://Pawanjangle:adgjmp100@cluster0-sktox.mongodb.net/test?retryWrites=true&w=majority", {useUnifiedTopology: true, useNewUrlParser: true}, (err)=>{
if( err )
{
console.log( "error" )
}
else
{
console.log( "mongodb connection successfull" ) }});
app.use( express.json() );
app.use( bodyparser.urlencoded( {extended: false} ) );
app.use( cors(  ) );
app.use( "/api/user", userRoute );
app.use( "/api/student", studentRoute );
app.use(express.static( path.join( __dirname, "public" ) )  );
app.get( "/", ( req, res )=>{
res.sendFile(path.join( __dirname, "public/index.html" ));});
const server = http.createServer( app );
const port = process.env.PORT || 3000;
app.listen( port, ( err )=>{
if( err ){
console.log( "error" );
}
else
{
console.log( 'Hello Pawan \nWelcome to Student Management System \nExpress server is listening on port', +port )}});