.PHONY: dev build typecheck add

dev:
	yarn dev

build:
	yarn build

typecheck:
	yarn typecheck

add:
	yarn add $(PKG)
