/* eslint-disable no-unused-vars */
import { Model, Sequelize } from 'sequelize';
import { CustomerAttributes, Customers } from './models/customers';
/* eslint-enable no-unused-vars */
import { Config } from '@config/config';

export class DBClient {
  /** @type {Sequelize} */
  #db;

  /**
   * Kafka Bridge Database client.
   * @constructor
   * @param {string} [uri] - Set the database uri connection. Default to Config.postgresURI
   */
  constructor(uri) {
    this.#db = new Sequelize(uri ?? Config.postgresURI, { logging: Config.sequelize.logging });
  }

  /**
   * Add a list of customer(s)
   *
   * @param {import('./models/customers').CustomerAttributes[]} customers
   *
   * @returns {Promise<void>}
   */
  async addCustomers(customers) {
    await Customers(this.#db).bulkCreate(customers);
  }

  /**
   * Get a list of customers
   *
   * @returns {Promise<import('./models/customers').CustomerAttributes[]>>}
   */
  async getCustomers() {
    return await Customers(this.#db).findAll({ raw: true });
  }

  async closeConnection() {
    await this.#db.close();
  }
}
