export class DBDataBuilder {
  /**
   * Generate a list of random customers
   *
   * @static
   *
   * @param {number} numberOfCustomers
   *
   * @returns {import('./models/customers').CustomerAttributes[]}
   */
  static generateCustomerList(numberOfCustomers) {
    const customers = [];
    for (let number = 0; number < numberOfCustomers; number++) {
      customers.push({
        firstName: 'bing', // use the StringUtils random gneerator here
        lastName: 'bong',
      });
    }
    return customers;
  }
}
