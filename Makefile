.PHONY: dev build typecheck add firebase-login deploy-firestore deploy-hosting deploy

dev:
	yarn dev

build:
	yarn build

typecheck:
	yarn typecheck

add:
	yarn add $(PKG)

firebase-login:
	npx firebase-tools login

deploy-firestore:
	npx firebase-tools deploy --only firestore

deploy-hosting: build
	npx firebase-tools deploy --only hosting

deploy: build
	npx firebase-tools deploy
