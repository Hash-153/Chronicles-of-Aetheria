.PHONY: all install build dev test benchmark lint

all: install build test

install:
	npm install

dev:
	npm run dev

build:
	npm run build

test:
	npm run test

benchmark:
	npm run benchmark

lint:
	npm run lint
