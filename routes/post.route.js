'use strict';

const express = require( 'express' );
const router = express.Router();

const { Post, CommentModel } = require( '../models/index' );

// Routes
router.get( '/post', getAllPosts );
router.get( '/postWithComment', getAllPostswithComments );
router.get( '/postWithComment/:id', getOnePostWithComments );
router.get( '/post/:id', getOnePost );
router.post( '/post', addPost );
router.put( '/post/:id', updatePost );
router.delete( '/post/:id', deletePost );



/**
 * It reads all the posts from the database and sends them back to the client
 * @param req - The request object.
 * @param res - The response object.
 */
async function getAllPosts ( req, res ) {
    let posts = await Post.read();
    res.status( 200 ).json( {
        posts
    } );
}

/**
 * > This function gets a post from the database and sends it to the client
 * @param req - The request object. This is an object that contains information about the HTTP request
 * that raised the event.
 * @param res - the response object
 */
async function getOnePost ( req, res ) {
    const id = req.params.id;
    const post = await Post.read( id );
    res.status( 200 ).json( post );
}

/**
 * We're creating a new post, then reading all posts, and sending them back to the client
 * @param req - The request object. This is an object that represents the HTTP request and has
 * properties for the request query string, parameters, body, HTTP headers, and so on.
 * @param res - the response object
 */
async function addPost ( req, res ) {
    const newPost = req.body;
    await Post.create( newPost )
        .then( async () => {
            await Post.read()
                .then( ( posts ) => {
                    res.status( 200 ).json( posts );
                } );
        } );
}

/**
 * It takes the id of the post to be updated from the request parameters, and the updated post object
 * from the request body, and then it updates the post with the given id with the given object
 * @param req - The request object.
 * @param res - The response object.
 */
async function updatePost ( req, res ) {
    const id = req.params.id;
    const obj = req.body;
    const post = await Post.update( id, obj );
    res.status( 201 ).json( post );
}

/**
 * It deletes a post with the given id
 * @param req - The request object.
 * @param res - The response object.
 */
async function deletePost ( req, res ) {
    const id = req.params.id;
    await Post.delete( id ).then( () => {
        res.status( 204 ).send( '' );
    } );
}

/**
 * It gets all the posts with comments.
 * @param req - The request object.
 * @param res - the response object
 */
async function getAllPostswithComments ( req, res ) {
    let posts = await Post.readWithComments( CommentModel );
    res.status( 200 ).json( {
        posts
    } );
}

/**
 * It reads one post from the database, and then reads all of the comments associated with that post,
 * and then returns the post with the comments attached to it
 * @param req - The request object.
 * @param res - the response object
 */
async function getOnePostWithComments ( req, res ) {
    const id = req.params.id;
    const post = await Post.readOneWithComments( id, CommentModel );
    res.status( 200 ).json( post );
}


module.exports = router;