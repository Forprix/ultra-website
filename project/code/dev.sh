#!/bin/bash
stmux -- [ [ "cd ./backend && npm i && npm start dev" ] : [ "cd ./frontend && npm i && npm run dev" ] ]