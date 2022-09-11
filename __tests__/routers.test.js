'use strict';

const supertest = require( 'supertest' );
const server = require( '../server' );
const request = supertest( server.app );

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
    const res =  await request.post('/post').send({
        title: 'this is a test',
        content: 'this is a test'
    })
    expect(res.status).toEqual(200);
});
});

describe('Test Post put route', () => {
    it('Update a post', async () => {
        const res =  await request.put('/post/7').send({
            title: 'new title new',
            content: 'new content new'
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
