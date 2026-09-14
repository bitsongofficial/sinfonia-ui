#!/usr/bin/env bash

set -euo pipefail

pnpm install --frozen-lockfile

if [[ "${CF_PAGES_BRANCH:-}" == "main" ]]; then

  pnpm run build:mainnet

else

  pnpm run build

fi
