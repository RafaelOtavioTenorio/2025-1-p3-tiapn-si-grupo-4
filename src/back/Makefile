test-:
	go test ./...

.PHONY: restart
restart:
	docker compose restart

.PHONY: run
run:
	docker compose up -d && docker logs -f app

.PHONY: down
down:
	docker compose down

.PHONY: up
up:
	if [ "$(MODE)" = "l" ]; then \
		docker compose up; \
	else \
		docker compose up -d; \
	fi

.PHONY: mysql
mysql:
	docker exec -it db mysql -u root -p

.PHONY: logs
logs:
	docker logs -f app