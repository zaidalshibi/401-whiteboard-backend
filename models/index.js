'use strict';

const { Sequelize, DataTypes } = require( 'sequelize' );
const post = require( './post.model' );
const comment = require( './comment.model' );
const user = require( './user.model' );
const POSTGRES_URL = process.env.DATABASE_URL || "postgresql://zaid:1470@localhost:5432/zaid";
const collection = require( '../collections/user-comment-routes' );

const sequelizeOption = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
};

let sequelize = new Sequelize( POSTGRES_URL, sequelizeOption );
const postModel = post( sequelize, DataTypes );
const commentModel = comment( sequelize, DataTypes );
const userModel = user( sequelize, DataTypes );

postModel.hasMany( commentModel, { foreignKey: 'postID', sourceKey: 'id' } );
commentModel.belongsTo( postModel, { foreignKey: 'postID', targetKey: 'id' } );

userModel.hasMany( postModel, { foreignKey: 'userID', sourceKey: 'id' } );
postModel.belongsTo( userModel, { foreignKey: 'userID', targetKey: 'id' } );

userModel.hasMany( commentModel, { foreignKey: 'userID', sourceKey: 'id' } );
commentModel.belongsTo( userModel, { foreignKey: 'userID', targetKey: 'id' } );



const postCollection = new collection( postModel );
const commentCollection = new collection( commentModel );
const userCollection = new collection( userModel );


module.exports = {
    db: sequelize,
    postCollection,
    commentCollection,
    userCollection,
    commentModel,
    postModel,
    userModel
};
// Author: Zaid Alshibi
