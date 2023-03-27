import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';
import dotenv from 'dotenv';
dotenv.config();

class User extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public roles!: string[];
    public fullname!: string;
    public description!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        roles: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
        underscored: true,
    }
);

export default User;