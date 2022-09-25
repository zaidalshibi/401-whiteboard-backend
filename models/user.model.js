'use strict';
const jwt = require( 'jsonwebtoken' );

module.exports = ( sequelize, DataTypes ) => {
    const User = sequelize.define( 'User', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            isEmail: true,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
            defaultValue: 'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        token: {
            type: DataTypes.VIRTUAL,
            get: function () {
                return jwt.sign( {
                    username: this.username
                }, process.env.JWT_SECRET );
            },
            set ( tokenObj ) {
                return jwt.sign( tokenObj, process.env.JWT_SECRET );
            }
        },
        role: {
            type: DataTypes.ENUM( 'admin', 'user' ),
            allowNull: false,
            defaultValue: 'user'
        },
        capabilities: {
            type: DataTypes.VIRTUAL,
            get: function () {
                const acl = {
                    admin: [ 'read', 'create', 'update', 'delete' ],
                    user: [ 'read', 'create' ]
                };
                return acl[ this.role ];
            }
        }
    } );
    User.authenticateToken = token => {
        return jwt.verify( token, process.env.JWT_SECRET, ( err, decoded ) => {
            if ( err ) {
                return err;
            } else {
                return decoded;
            }
        } );
    };
    return User;
};
// Author: Zaid Alshibi