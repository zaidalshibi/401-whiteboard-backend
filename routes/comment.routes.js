'use strict';

const express = require( 'express' );
const router = express.Router();

const { commentCollection } = require( '../models/index' );

// Routes
router.get( '/comment', getAllComments );
router.post( '/comment/:postID/:userID', addComment );
router.put( '/comment/:id', updateComment );
router.delete( '/comment/:id', deleteComment );


/**
 * > This function gets all comments from the database and sends them back to the client
 * @param req - The request object.
 * @param res - The response object.
 */
async function getAllComments ( req, res ) {
    let comments = await commentCollection.read();
    res.status( 200 ).json( {
        comments
    } );
}

/**
 * We're creating a new comment, then reading all the comments, and sending them back to the client
 * @param req - The request object. This is an object that contains information about the HTTP request
 * that raised the event.
 * @param res - the response object
 */
async function addComment ( req, res ) {
    const postID = req.params.postID;
    const content = req.body.content;
    const userID = req.params.userID;
    const obj = {postID, content, userID};
    await commentCollection.create( obj )
        .then( async () => {
            await commentCollection.read()
                .then( ( comments ) => {
                    res.status( 200 ).json( comments );
                } );
        } );
}


/**
 * It takes the id of the comment to be updated from the request parameters, and the updated comment
 * object from the request body, and then it updates the comment in the database and returns the
 * updated comment
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
async function updateComment ( req, res ) {
    const id = req.params.id;
    const obj = req.body;
    const comment = await commentCollection.update( id,obj );
    res.status( 201 ).json( comment );
}

/**
 * It deletes a comment from the database and returns a 204 status code
 * @param req - The request object.
 * @param res - The response object.
 */
async function deleteComment ( req, res ) {
    const id = req.params.id;
    await commentCollection.delete( id ).then( () => {
        res.status( 204 ).send( '' );
    } );
}


module.exports = router;