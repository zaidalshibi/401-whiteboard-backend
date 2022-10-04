'use strict';

const Acl = ( capability ) => {
    return function ( req, res, next ) {
        if ( !req.user.capabilities.includes( capability ) ) {
            if ( req.user.id === parseInt(req.params.userid) ) {
                next();
            } else {
                res.status( 403 ).send( 'Access Denied' );
            }
        } else {
            next();
        }
    };
};

module.exports = Acl;