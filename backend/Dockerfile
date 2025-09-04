
FROM php:8.3-fpm


RUN apt-get update && apt-get install -y \
    git \
    libzip-dev \
    unzip \
    libonig-dev \
    libpng-dev \
    libpq-dev \
    libsqlite3-dev \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*


RUN docker-php-ext-install pdo_sqlite mbstring exif pcntl bcmath zip opcache


RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer


WORKDIR /var/www/html


COPY . .


RUN chmod -R 777 /var/www/html


EXPOSE 9000