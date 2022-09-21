'use strict';

const supertest = require( 'supertest' );
const server = require( '../server' );
const request = supertest( server.app );


describe( 'Test User signup route', () => {
    // it( 'Signup a user with wrong email', async () => {
    //     const res = await request.post( '/signup' ).send( {
    //         username: 'zaid',
    //         email: 'zaidzaid.com',
    //         password: 'password'
    //     } );
    //     expect( res.status ).toEqual( 409 );
    // } );

    it( 'Signup a user with existing username', async () => {
        const res = await request.post( '/signup' ).send( {
            username: 'zaidzaid',
            email: 'zaidealshibi@gmail.com',
            password: 'password'
        } );
        expect( res.status ).toEqual( 409 );
    } );

    it( 'Signup a user with existing email', async () => {
        const res = await request.post( '/signup' ).send( {
            username: 'zaid',
            email: 'zaidzaid@zaid.com',
            password: 'password'
        } );
        expect( res.status ).toEqual( 409 );
    } );
} );


