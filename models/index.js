'use strict';

const { Sequelize, DataTypes } = require( 'sequelize' );
const post = require( './post.model' );
const POSTGRES_URL = process.env.HEROKU_POSTGRESQL_MAUVE_URL || "postgresql://zaid:1470@localhost:5432/zaid";


const sequelizeOption = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
};

let sequelize = new Sequelize( POSTGRES_URL, sequelizeOption );

module.exports = {
    db: sequelize,
    Post: post( sequelize, DataTypes )
};

// Author: Zaid Alshibi