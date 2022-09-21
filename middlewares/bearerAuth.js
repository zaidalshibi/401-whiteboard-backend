'use strict';

const { userModel } = require( "../models/index" );

module.exports = async ( req, res, next ) => {
    if ( !req.headers.authorization ) {
        next( 'Invalid Login' );
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
                next( 'Invalid Login' );
            }
        } catch ( error ) {
            next( error );
        } 
    }
}