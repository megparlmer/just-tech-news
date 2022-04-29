//import model class and DataTypes object from sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create User model
//the model class is what my models will be created from using the extends keyword
//so User inherits all functionality of Model class
class User extends Model {}

//define table columns and configuration
//initialize the model's data and configuration
User.init(
    {
        //define an id column
        id: {
            //use the special sequelize DataTypes object provide what type of data it is
            type: DataTypes.INTEGER,
            //the equivalent of SQL's NOT NULL option
            allowNull: false,
            //instruct that this is the primary key
            primaryKey: true,
            //turn on auto increment
            autoIncrement: true
        },
        //define username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //there cannot be any duplicate email values in this table
            unique: true,
            //if allowNull is set to false, our data can be run through validators before creating the table data
            validate: {
                isEmail: true
            }
        },
        //define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //stating that the password cannot be longer than four characters
                len: [4]
            }
        }
    },
    {
        // pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        // don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // don't pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;