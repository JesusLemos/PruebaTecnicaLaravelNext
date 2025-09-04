# Usa la imagen base de PHP-FPM, que es perfecta para trabajar con Nginx
FROM php:8.3-fpm

# Instala las dependencias del sistema operativo que Laravel necesita.
# `git` es crucial para que Composer pueda descargar paquetes.
# `libzip-dev` y `unzip` son para el manejo de archivos ZIP.
# Las demás extensiones son necesarias para funcionalidades comunes de Laravel y bases de datos.
RUN apt-get update && apt-get install -y \
    git \
    libzip-dev \
    unzip \
    libonig-dev \
    libpng-dev \
    libpq-dev \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

# Instala las extensiones de PHP.
# `pdo_sqlite` es vital para la base de datos que usarás.
# `mbstring` es para el manejo de strings, y el resto son requeridas por Laravel.
RUN docker-php-ext-install pdo_sqlite mbstring exif pcntl bcmath zip opcache

# Instala Composer de forma segura y permanente en el contenedor.
# Este comando descarga el instalador de Composer y lo ejecuta con PHP.
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Establece el directorio de trabajo dentro del contenedor.
# Todos los comandos subsecuentes se ejecutarán aquí.
WORKDIR /var/www/html

# Copia los archivos de tu proyecto local al contenedor.
COPY . .

# Expone el puerto por defecto de PHP-FPM.
# Nginx lo usará para comunicarse con el contenedor de PHP.
EXPOSE 9000