'use strict';

const supertest = require( 'supertest' );
const server = require( '../server' );
const request = supertest( server.app );
jest.setTimeout(10000);

describe('Test Post Routes', () => {
    it('should respond with 404 on an invalid route', async () => {
        const res = await request.get('/foo');
        expect(res.status).toEqual(404);
    });
    it('Home page works', async () => {
        const res = await request.get('/');
        expect(res.status).toEqual(200);
        expect(res.text).toEqual('{"message":"Home page","code":200}');
    });
});


describe('Test Post get routes', () => {
    it('Get all posts', async () => {
        const res = await request.get('/post');
        expect(res.status).toEqual(200);
    });
    it('Get one post', async () => {
        const res = await request.get('/post/12');
        expect(res.status).toEqual(200);
        expect(res.text).toEqual('{"id":12,"title":"this is a test","content":"this is a test","img":"https://www.computersciencedegreehub.com/wp-content/uploads/2016/02/what-is-coding-768x512.jpg","createdAt":"2022-09-11T22:09:38.919Z","updatedAt":"2022-09-11T22:09:38.919Z"}');
    });
});

describe('Test Post post route', () => {
it('Create a post', async () => {
    const res = await request.post('/post').send({
        title: 'this is a test',
        content: 'this is a test'
    });
    expect(res.status).toEqual(200);
});
});

describe('Test Post put route', () => {
    it('Update a post', async () => {
        const res = await request.put('/post/7').send({
            title: 'new title',
            content: 'new content'
        });
        expect(res.status).toEqual(201);
        });
});


describe('Test Post delete route', () => {
    it('Delete a post', async () => {
        const res = await request.delete('/post/16');
        expect(res.status).toEqual(204);
        expect(res.text).toEqual('');
    });
});
