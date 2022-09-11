'use strict';

const Post = ( sequelize, DataTypes ) => sequelize.define( 'Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        defaultValue: true
    },
    img : {
        type: DataTypes.STRING,
        defaultValue: 'https://www.computersciencedegreehub.com/wp-content/uploads/2016/02/what-is-coding-768x512.jpg'
    }
} );

module.exports = Post;


// Author: Zaid Alshibi