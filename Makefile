build:
	docker-compose -f compose.yaml up --build -d

.PHONY: update-hosts build
