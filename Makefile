build: 
	docker-compose -f compose.yaml up --build -d

sh: 
	docker exec -it golf /bin/sh

.PHONY: build sh
