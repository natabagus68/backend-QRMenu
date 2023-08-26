import { Sequelize } from 'sequelize';
import configs from '../configs/index';

const { database } = configs;

export default new Sequelize(database.database, database.username, database.password, {
    host: database.host,
    port: database.port,
    dialect: database.dialect,
});