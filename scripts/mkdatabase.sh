#!/bin/bash

cat src/sql/*.sql | sqlite3 bizeebird-test.db
