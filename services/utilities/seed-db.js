import { Config } from '@config/config';
import { Customers } from '@services/db/models/customers';
import { Sequelize } from 'sequelize';

const db = new Sequelize(Config.postgresURI);

Customers(db).sync();
