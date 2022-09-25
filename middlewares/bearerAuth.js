'use strict';

const { userModel } = require( "../models/index" );

module.exports = async ( req, res, next ) => {
    if ( !req.headers.authorization ) {
        res.status(401).send( 'Invalid Login' );
    } else {
        const token = req.headers.authorization.split( ' ' ).pop();
        try {
            const validUser = await userModel.authenticateToken( token );
            const user = await userModel.findOne( {
                where: {
                    username: validUser.username
                }
            } );
            if ( user ) {
                req.user = user;
                req.token = user.token;
                next();
            } else {
                res.status(401).send( 'Invalid Login' );
            }
        } catch ( error ) {
            res.status(401).send( error );;
        } 
    }
}