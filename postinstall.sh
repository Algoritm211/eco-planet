#!/bin/sh

node ./decorate-angular-cli.js && ngcc --properties es2020 browser module main

cd ./apps/contract && npm install

