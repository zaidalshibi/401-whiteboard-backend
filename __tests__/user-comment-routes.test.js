'use strict';

const Collection = require( '../collections/user-comment-routes' );

describe('Test creating new instance from the collection', () => {
    it('create new instance', () => {
        const newCollection = new Collection();
        expect(newCollection).toBeDefined();
    });
    it('test each method', () => {
        const newCollection = new Collection();
        expect(newCollection.create).toBeDefined();
        expect(newCollection.read).toBeDefined();
        expect(newCollection.update).toBeDefined();
        expect(newCollection.delete).toBeDefined();
        expect(newCollection.readWithComments).toBeDefined();
        expect(newCollection.readOneWithComments).toBeDefined();
        });
});
