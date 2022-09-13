'use strict'

const supertest = require( 'supertest' );
const server = require( '../server' );
const request = supertest( server.app );
jest.setTimeout(10000);

describe('Test Comment get route', () => {
    it('get all comments', async() => {
        const res = await request.get('/comment');
        expect(res.status).toEqual(200);
    });
})

describe('Test comment post route', () => {
    it('Create a comment', async () => {
        const res =  await request.post('/comment/17').send({
            content: 'this is a test'
        })
        expect(res.status).toEqual(200);
    });
    });
    
    describe('Test comment put route', () => {
        it('Update a comment', async () => {
            const res =  await request.put('/comment/1').send({
                ownerID: 17,
                content: 'new content new'
            });
            expect(res.status).toEqual(201);
            });
    });
    
    
    describe('Test comment delete route', () => {
        it('Delete a comment', async () => {
            const res = await request.delete('/comment/1');
            expect(res.status).toEqual(204);
            expect(res.text).toEqual('');
        });
    });