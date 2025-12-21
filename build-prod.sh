#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

if [ -f .env.prod ]; then
  # "set -a" automatically exports all variables defined subsequently
  set -a
  source .env.prod
  set +a
else
  echo "Error: .env.prod file not found!"
  exit 1
fi

IMAGE=simonbiel/private
SERVICE=know-before-you-go
VERSION=v0.1.0
ENV=prod
TAG=$IMAGE:$SERVICE-$VERSION-$ENV

echo "Building $TAG"

docker build \
  --platform linux/amd64 \
  -f ./dockerfile \
  -t $TAG \
  .

echo "Build successful. Pushing to registry..."
docker push $TAG
