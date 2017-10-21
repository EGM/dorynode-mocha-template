#!/bin/sh

# while read LINE; do
 # echo ${LINE} # do something with it here
# done
# read -p "install Mocha locally or globally? [l/g] = (global)" -n 1 c
# echo $c

npm install --no-bin-links --save-dev mocha
npm install --no-bin-links --save-dev should
npm install --no-bin-links --save-dev webpack
npm install --no-bin-links --save-dev gulp
npm install --no-bin-links --save-dev nyc
npm install --no-bin-links --save-dev source-map-support


exit 0