import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';
import User from './user';
import dotenv from 'dotenv';
dotenv.config();

class Post extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public content!: string;
    public tags!: string;
    public category!: string;
    public date!: string;
    public slug!: string;
    public published!: boolean;
    public userId!: number;
    public index!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        published: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        index: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'posts',
        timestamps: true,
        underscored: true,
    }
);

User.hasMany(Post);
Post.belongsTo(User);

export default Post;