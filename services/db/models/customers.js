/* eslint-disable no-unused-vars */
import { DataTypes, Sequelize } from 'sequelize';
/* eslint-enable no-unused-vars */

/**
 * @typedef CustomerAttributes
 * @type {object}
 * @property {string} firstName
 * @property {string} [lastName]
 */

/**
 * Customer model
 *
 * @param {Sequelize} db
 */
export const Customers = (db) => {
  // match this definition to db schema we need to use
  // see https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
  return db.define('customers', {
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
  });
};
