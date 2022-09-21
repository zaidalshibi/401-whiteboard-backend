'use strict';

const { signup, allUser, login } = require( '../controllers/user.controller' );
const bearerAuth = require( '../middlewares/bearerAuth' );
const {saveUser} = require( '../middlewares/userAuth' );

const router = require( 'express' ).Router();

router.post( '/signin', login );
router.post( '/signup', saveUser, signup );
router.get( '/users', bearerAuth, allUser );

module.exports = router;