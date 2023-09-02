import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

class Company extends Model { }
Company.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    color_theme: DataTypes.STRING,
    avatarPath: DataTypes.STRING,
    balance: DataTypes.INTEGER
},
    {
        sequelize,
        tableName: 'companies',
        createdAt: 'created_ad',
        updatedAt: 'updated_at'
    }
)

export default Company