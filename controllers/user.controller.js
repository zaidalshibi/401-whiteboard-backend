'use strict';
const bcrypt = require( 'bcrypt' );
const base64 = require( 'base-64' );
const { commentModel, postModel, userModel } = require( '../models/index' );

const signup = async ( req, res ) => {
    try {
        const { username, email, password, avatar } = req.body;
        const data = {
            username,
            email,
            password: await bcrypt.hash( password, 10 ),
            avatar,
        };
        const user = await userModel.create( data );
        if ( user ) {
            res.status( 200 ).json( user );
        }
    } catch ( error ) {
        console.log( error );
    }
};

const allUser = async ( req, res ) => {
    const users = await userModel.findAll({include: [ commentModel , postModel ]});
    res.json( users );
};

const login = async ( req, res ) => {
    const basicHeader = req.headers.authorization.split( ' ' );
    const encodedValue = basicHeader.pop();
    const decodedValue = base64.decode( encodedValue );
    const [ username, password ] = decodedValue.split( ':' );
    const user = await userModel.findOne( {
        where: {
            username: username
        }
    } );
    if ( user ) {
        const isSame = await bcrypt.compare( password, user.password );
        if ( isSame ) {
            return res.status( 200 ).json( {"user" : {
                "username": user.username,
                "id": user.id,
            },
            "token": user.token
            } );
        } else {
            return res.status( 401 ).send( 'You are not authorized' );
        }
    } else {
        return res.status( 401 ).send( 'You are not authorized' );
    }
};


module.exports = {
    signup,
    allUser,
    login
};