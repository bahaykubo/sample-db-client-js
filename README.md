# Sample DB Client

- [Sample DB Client](#sample-db-client)
- [Create local container of postgresql](#create-local-container-of-postgresql)
- [Run test](#run-test)

This is a sample db client for postgresql using the [sequelize package](https://www.npmjs.com/package/sequelize).

# Create local container of postgresql

To run the sample test, we will need to have a local container instance of postgresql running with the necessary tables created. We can have this by running the script

```bash
npm run start-seed-db
```

This will run a [shell script](./scripts/start-db.sh) that will create a postgres container and run [seed-db.js](./services/utilities/seed-db.js) which will create the table if it doesn't exist.

# Run test

To run the sample db client test, run 

```bash
npm run test tests/db/db.test.ts
```

This will insert a few records to the db table and then will get all the customers from the table, and check that each record has the expected fields.
