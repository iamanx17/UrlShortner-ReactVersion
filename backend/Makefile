build:
	docker compose build

run:
	docker compose up backend db redis

bash:
	docker exec -it link-shortner bash

psql:
	docker exec -it link-shortner-pg psql -U postgres postgres

migrate:
	docker compose exec backend alembic upgrade head