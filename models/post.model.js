'use strict';

module.exports =  ( sequelize, DataTypes ) => sequelize.define( 'Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        defaultValue: 'My name is Zaid Alshibi, 24 years old'
    },
    img : {
        type: DataTypes.STRING,
        defaultValue: 'https://www.computersciencedegreehub.com/wp-content/uploads/2016/02/what-is-coding-768x512.jpg'
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
} );
// Author: Zaid Alshibi