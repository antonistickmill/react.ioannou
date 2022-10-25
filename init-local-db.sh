#!/usr/bin/env bash

psql --echo-all --username postgres <<-EOSQL
CREATE DATABASE "tm_backend" WITH OWNER deployer;
CREATE DATABASE "tm_backend_test" WITH OWNER deployer;
EOSQL
