'use strict';

const express = require( 'express' );
const Acl = require( '../middlewares/ACL' );
const bearerAuth = require( '../middlewares/bearerAuth' );
const router = express.Router();

const { postCollection, commentModel, postModel, userModel } = require( '../models/index' );

// Routes
router.get( '/post', bearerAuth, Acl('read'), getAllPostswithComments );
router.get( '/post/:id', bearerAuth, Acl('read'), getOnePostWithComments );
router.post( '/post', bearerAuth, Acl('create'), addPost );
router.put( '/post/:id', bearerAuth, Acl('update'), updatePost );
router.delete( '/post/:id', bearerAuth, Acl('delete'), deletePost );



/**
 * It gets all the posts with comments.
 * @param req - The request object.
 * @param res - the response object
 */
async function getAllPostswithComments ( req, res ) {
    const comments = await commentModel.findAll({include: [ userModel ]});
    let posts = await postModel.findAll( {
        include: [userModel]
        } );
    posts = posts.map( ( post ) => {
        post.dataValues.comments = comments.filter( ( comment ) => {
            return comment.postID === post.id;
        } );
        return post;
    } );
    const response = posts.map( ( post ) => {
        return {
            id: post.id,
            title: post.title,
            content: post.content,
            img: post.img,
            user : {
                id: post.User.id,
                username: post.User.username,
                avatar: post.User.avatar
            },
            comments: post.dataValues.comments?.map( ( comment ) => {
                return {
                    id: comment.id,
                    content: comment.content,
                    postID: comment.postID,
                    user: {
                        id: comment.User.id,
                        username: comment.User.username,
                        avatar: comment.User.avatar
                    }
                };
            } )
        };
    } );
    res.status( 200 ).json( response );
}

/**
 * It reads one post from the database, and then reads all of the comments associated with that post,
 * and then returns the post with the comments attached to it
 * @param req - The request object.
 * @param res - the response object
 */
async function getOnePostWithComments ( req, res ) {
    const id = req.params.id;
    const comments = await commentModel.findAll( {
        where: {
            postID: id
        },
        include: [ userModel ]
    } );
    const post = await postModel.findOne( {
        where: {
            id: id
        },
        include: [ userModel ]
    } );
    post.dataValues.comments = comments;
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
    await postCollection.create( newPost )
        .then( async () => {
            await postCollection.read()
                .then( ( posts ) => {
                    res.status( 201 ).json( posts );
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
    const post = await postCollection.update( id, obj );
    res.status( 201 ).json( post );
}

/**
 * It deletes a post with the given id
 * @param req - The request object.
 * @param res - The response object.
 */
async function deletePost ( req, res ) {
    const id = req.params.id;
    const comments = await commentModel.findAll( {
        where: {
            postID: id
        }
    } );
    comments.forEach( async ( comment ) => {
        await commentModel.destroy( {
            where: {
                id: comment.id
            }
        } );
    } );
    await postCollection.delete( id ).then( () => {
        res.status( 204 ).send( '' );
    } );
}



module.exports = router;