# !/bin/bash

if [ "$CF_PAGES_BRANCH" == "main" ]; then

  npm install -g pnpm && pnpm i && pnpm run build:mainnet

elif [ "$CF_PAGES_BRANCH" == "testnet" ]; then

  npm install -g pnpm && pnpm i && pnpm run build

fi
