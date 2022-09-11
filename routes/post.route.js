'use strict';

const express = require( 'express' );
const router = express.Router();

const { Post } = require( '../models/index' );

// Routes
router.get( '/post', getAllPost );
router.get( '/post/:id', getOnePost );
router.post( '/post', addPost );
router.put( '/post/:id', updatePost );
router.delete( '/post/:id', deletePost );


/**
* It's an async function that takes in a request and a response object, and returns all the posts in
* the database
* @param req - The request object.
* @param res - array of post objects.
*/
async function getAllPost ( req, res ) {
    let posts = await Post.findAll();
    res.status( 200 ).json( {
        posts
    } );
}

/**
* We're using the `findOne` method of the `Post` model to find a post with the id that matches the id
* in the request parameters
* @param req - The request object.
* @param res - the post object of id.
*/
async function getOnePost ( req, res ) {
    const id = req.params.id;
    const post = await Post.findOne( {
        where: { id: id }
    } );
    res.status( 200 ).json( post );
}

/**
* It creates a new post using the data in the request body, and returns the new post in the response
* @param req - JSON object has the post data.
* @param res - array of post objects.
*/
async function addPost ( req, res ) {
    const newPost = req.body;
    await Post.create( newPost )
        .then( async () => {
            await Post.findAll()
                .then( ( posts ) => {
                    res.status( 200 ).json( posts );
                } );
        } );
}

/**
* We're going to find a post by its id, then update it with the data we get from the request body
* @param req - JSON object has the updated post data.
* @param res - the updated post object.
*/
async function updatePost ( req, res ) {
    const id = req.params.id;
    const obj = req.body;
    const post = await Post.findOne( {
        where: { id: id }
    } );
    const updatedPost = await post.update( obj );
    res.status( 201 ).json( updatedPost );
}

/**
* It deletes a post from the database
* @param req - The request object.
* @param res - 204 code.
*/
async function deletePost ( req, res ) {
    const id = req.params.id;
    await Post.destroy( {
        where: { id: id }
    } ).then( () => {
        res.status( 204 ).send( '' );
    } );
}



module.exports = router;