import { DBDataBuilder } from '@services/db';
import { DBClientPG } from '@services/db/db-client-pg';
import { expect } from 'chai';

describe('Kafka DB Bridge using postgres library', function () {
  const dbClient = new DBClientPG();

  before('Connect client to db', async function () {
    await dbClient.connect();
  });

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
