#!/bin/bash

docker compose up -d
node server.js --watch
