/* eslint-disable no-unused-vars */
import { Customers } from './models/customers';
/* eslint-enable no-unused-vars */
import { Client } from 'pg';
import { Config } from '@config/config';

export class DBClientPG {
  /** @type {Client} */
  #client;

  /**
   * Kafka Bridge Database client using PG.
   * We are using a client instead of a pool due to the nature of how we interact with the db
   *
   * @constructor
   * @param {object} [connection] - Set the client connection details. Default to Config.postgresClient
   * @param {string} connection.user
   * @param {string} connection.host
   * @param {string} connection.database
   * @param {string} connection.password
   * @param {number} connection.port
   */
  constructor(clientConnectionDetails) {
    this.#client = new Client(clientConnectionDetails ?? Config.postgresClient);
  }

  async connect() {
    await this.#client.connect();
  }

  async closeConnection() {
    await this.#client.end();
  }

  /**
   * Add a list of customer(s)
   *
   * @param {import('./models/customers').CustomerAttributes[]} customers
   *
   * @returns {Promise<void>}
   */
  async addCustomers(customers) {
    const customersString = this.#convertCustomerListToInsertString(customers);
    await this.#client
      .query(`INSERT INTO customers ("firstName", "lastName", "createdAt", "updatedAt") VALUES ${customersString}`)
      .catch((error) => { throw new Error(error); });
  }

  /**
   * Get a list of customers
   *
   * @param {number} limit
   *
   * @returns {Promise<import('./models/customers').CustomerAttributes[]>>}
   */
  async getCustomers(limit) {
    let queryLimit;

    if (limit || limit === 0) {
      queryLimit = `LIMIT ${limit}`;
    }

    return await this.#client
      .query(`SELECT * from customers ${queryLimit}`)
      .then((result) => result.rows)
      .catch((error) => { throw new Error(`Failed to get customers. ${error}`); });
  }

  /**
   * Convert Customer list to a string for inserting to customer table
   *
   * @private
   */
  #convertCustomerListToInsertString(customers) {
    return customers
      .map((customer) => {
        return `('${customer.firstName}', '${customer.lastName}', NOW(), NOW())`;
      })
      .join(',');
  }
}
