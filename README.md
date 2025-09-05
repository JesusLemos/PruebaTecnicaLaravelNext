# PruebaTecnicaLaravelNext

# PASO 1: Configurar el entorno y los permisos

# Copia el archivo de variables de entorno de ejemplo.
cp .env-example .env

# Añade el UID y GID de tu usuario local al archivo .env.
# Esto es crucial para evitar errores de permisos con Docker.
echo "UID=$(id -u)" >> .env
echo "GID=$(id -g)" >> .env

# Asegúrate de que el usuario de tu máquina local es el propietario del archivo de la base de datos.
# Esto previene el error "attempt to write a readonly database".
sudo chown $(id -u):$(id -g) backend/database/database.sqlite


# PASO 2: Levantar el contenedor y preparar la aplicación

# Ejecuta todos los servicios, con el flag "--build" para crear la imagen si no existe.
# Luego, entra al contenedor de backend para instalar las dependencias.
docker compose up --build -d

# Entra al contenedor del backend para instalar las dependencias de la aplicación.
docker compose exec backend bash

# Una vez dentro del contenedor, ejecuta los siguientes comandos:
composer install
php artisan migrate
php artisan key:generate

# Sal del contenedor con el comando 'exit'.
exit


# PASO 3: Levantar la aplicación

# Con las dependencias instaladas y la base de datos lista, reinicia los servicios.
# La aplicación ya debería estar funcionando en modo "detached".
docker compose down
docker compose up -d