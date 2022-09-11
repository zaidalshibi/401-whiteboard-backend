'use strict';

const supertest = require( 'supertest' );
const server = require( '../server' );
const request = supertest( server.app );

describe( 'Server Running test', () => {
    it( 'should respond with 404 on an invalid route', async () => {
        const res = await request.get( '/foo' );
        expect( res.status ).toEqual( 404 );
    } );
    it( 'Home page works', async () => {
        const res = await request.get( '/' );
        expect( res.status ).toEqual( 200 );
        expect( res.text ).toEqual( '{\"message\":\"Home page\",\"code\":200}' );
    } );
} );

// Author: Zaid Alshibi