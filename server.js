'use strict';

const express = require( 'express' );
const cors = require( 'cors' );
const app = express();
const notFoundHandler = require( './error-handlers/404' );
const errorHandler = require( './error-handlers/500' );
const postRouter = require( './routes/post.routes' );
const commentRouter = require( './routes/comment.routes' );
const userRouter = require( './routes/user.routes' );

app.use( cors() );
app.use( express.json() );


app.use( postRouter );
app.use( commentRouter );
app.use( userRouter );

/* This is a route handler. It is listening for a get request to the root route. When it gets a
request, it sends back a json object with a message and a code. */
app.get( '/', ( req, res ) => {
    res.status( 200 ).json( {
        message: 'Home page',
        code: 200
    } );
} );

app.use( notFoundHandler );
app.use( errorHandler );

function start ( port ) {
    app.listen( port, () => console.log( `Up an running on port ${port}` ) );
}

module.exports = {
    start,
    app
};

// Author: Zaid Alshibi