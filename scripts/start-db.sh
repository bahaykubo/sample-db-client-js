#!/bin/bash

docker stop postgresql
docker rm postgresql

# Create a postgresql instance locally for the test with a name of 'postgresql'
# We will not need this if we are connecting to a static environment database
docker run --name postgresql \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=userpass \
  -p 5432:5432 \
  -v /database/postgresql:/var/lib/postgresql/data \
  -d postgres
