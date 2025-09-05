.PHONY: laravel node create-laravel-project artisan-migrate

laravel:
	docker run --rm \
		--name notes-app-backend \
		-v $(PWD):/var/www/html \
		-w /var/www/html \
		-p 9000:9000 \
		-it php:8.3-fpm bash

node:
	docker run --rm \
		-w /app \
		-v $(PWD):/app \
		-p 3000:3000 \
		-it node:20 bash

artisan-migrate:
	docker run --rm \
		-v $(PWD):/var/www/html \
		-w /var/www/html \
		php:8.3-fpm-alpine php artisan migrate

create-laravel-project:
	docker run --rm \
		-v $(PWD):/app \
		-w /app \
		composer:latest create-project laravel/laravel ./backend