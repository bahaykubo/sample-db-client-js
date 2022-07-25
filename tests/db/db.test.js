import { DBClient, DBDataBuilder } from '@services/db';
import { expect } from 'chai';

describe('Kafka DB Bridge using sequelize orm library', function () {
  const dbClient = new DBClient();

  after('Close db connection', async function () {
    await dbClient.closeConnection();
  });

  it('Should add new customers to db', async function () {
    const newCustomers = DBDataBuilder.generateCustomerList(10);
    await dbClient.addCustomers(newCustomers);

    const allCustomers = await dbClient.getCustomers();
    allCustomers.forEach((customer) => {
      expect(customer).to.include.keys(['firstName', 'lastName']);
    });
  });
});
