#!/usr/bin/env bash

if ! test -d dist; then
  echo "Welcome to Wix Style React!"
  echo ""
  echo "allow me to build project and prepare storybook for first run..."
  echo ""

  npm run build
fi

svg2react-icon-once
npm run storybook & yoshi start
