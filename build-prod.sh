#!/bin/bash

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

echo "Building $IMAGE:$SERVICE-$VERSION-$ENV"

docker build \
  --platform linux/amd64 \
  -f ./dockerfile \
  -t $IMAGE:$SERVICE-$VERSION-$ENV \
  .

docker push $IMAGE:$SERVICE-$VERSION-$ENV

