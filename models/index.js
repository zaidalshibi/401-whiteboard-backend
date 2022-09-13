'use strict';

const { Sequelize, DataTypes } = require( 'sequelize' );
const post = require( './post.model' );
const comment = require('./comment.model')
const POSTGRES_URL = process.env.DATABASE_URL || "postgresql://zaid:1470@localhost:5432/zaid";
const collection = require('../collections/user-comment-routes')

const sequelizeOption = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
};

let sequelize = new Sequelize( POSTGRES_URL, sequelizeOption );
const postModel = post(sequelize, DataTypes);
const commentModel = comment(sequelize,DataTypes);

postModel.hasMany(commentModel, {foreignKey: 'ownerID', sourceKey: 'id'}) // sourceKey is the Primary key
commentModel.belongsTo(postModel, {foreignKey: 'ownerID', targetKey: 'id'})

const postCollection = new collection(postModel);
const commentCollection =new collection(commentModel);



module.exports = {
    db: sequelize,
    Post: postCollection,
    Comment: commentCollection,
    CommentModel: commentModel
};

// Author: Zaid Alshibi
