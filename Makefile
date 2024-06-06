build:
	docker-compose -f docker-compose.yaml up --build -d

.PHONY: update-hosts build
