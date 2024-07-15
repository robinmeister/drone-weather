#!/usr/bin/env bash

set -e

# Build the project
npm run build

cd dist

git init
git add -A 
git commit -m 'New deployment'
git push -f git@github.com:robinmeister/drone-weather.git master:gh-pages

cd -