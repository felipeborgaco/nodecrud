#!/bin/bash
npm install
docker compose up -d
node server.js --watch
