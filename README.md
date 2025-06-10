# SSCatFacts

## Descripción

La Plataforma SSCatFacts es una aplicación web diseñada para los amantes de los gatos, permitiéndoles descubrir y gestionar curiosidades sobre estos felinos. Consiste en un backend que consume una API externa de "Cat Facts" y un frontend interactivo donde los usuarios pueden registrarse, iniciar sesión, explorar nuevos facts, marcar sus favoritos y visualizar los facts más populares de la comunidad. El objetivo es ofrecer una experiencia sencilla y divertida para aprender más sobre los gatos.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (v22.15.0 o superior)
- [npm](https://www.npmjs.com/) (viene con Node.js)
- [PostgreSQL](https://www.postgresql.org/download/) (Requerido si se ejecuta la aplicación sin Docker)

## Instalación

1.  Clona el repositorio:

    ```bash
    git clone https://github.com/alejandromoyanom/SSCatFacts.git
    ```

2.  Navega al directorio del proyecto:

    ```bash
    cd SSCatFacts
    ```

3.  Instala las dependencias del backend:

    ```bash
    cd backend
    npm install
    ```

4.  Instala las dependencias del frontend:

    ```bash
    cd ../frontend
    npm install
    ```

## Configuración

### Backend

1.  Crea un archivo `.env` en el directorio `backend` con las siguientes variables de entorno para la conexión a la base de datos:

    ```
    DB_NAME=nombre_de_tu_base_de_datos # Por ejemplo: catfacts_db
    DB_USER=usuario_de_tu_db          # Por ejemplo: postgres
    DB_PASSWORD=tu_password_de_db     # Por ejemplo: mysecretpassword
    DB_HOST=localhost                 # O la IP de tu servidor de DB
    PORT=3001
    ```

    **Nota:** Asegúrate de que tienes una base de datos PostgreSQL creada con el nombre y credenciales especificadas.

### Frontend

segúrate de que la variable `baseURL` en `frontend/src/services/api.js` apunte correctamente a la ruta base de tu API. Debería ser solo la ruta relativa para que el proxy de Vite funcione correctamente:

    ```javascript
    // frontend/src/services/api.js
    const API_BASE_PATH = "/api";

    const api = axios.create({
      baseURL: API_BASE_PATH,
    });
    // ...
    ```
    Internamente, Vite gestionará si esta ruta se redirige a `http://localhost:3001/api` (en desarrollo local) o a `http://backend:3001/api` (en Docker Compose).
    ```

## Ejecución (Sin Docker)

Para levantar la aplicación sin Docker (requiere que tengas Node.js y la base de datos instalados y configurados localmente):

### Backend

1.  Desde el directorio `backend`, inicia el servidor:

    ```bash
    cd backend
    npm start # O npm run dev, si tu script de inicio es 'dev'
    ```

    El backend correrá por defecto en el puerto `3001`.

### Frontend

1.  Desde el directorio `frontend`, inicia la aplicación de React:

    ```bash
    cd frontend
    npm run dev
    ```

    El frontend correrá por defecto en el puerto `5173`. Abre tu navegador y visita `http://localhost:5173`.

## Decisiones de Diseño

- **Arquitectura:** El proyecto sigue una arquitectura **Monorepo** para gestionar el backend y el frontend en un único repositorio, facilitando la colaboración y la gestión de versiones.
- **Backend (Node.js con Express):**
  - **Express:** Se eligió Express por su simplicidad y flexibilidad para crear APIs RESTful de manera eficiente.
  - **Sequelize ORM:** Para la interacción con la base de datos relacional, se optó por Sequelize ORM. Su potente abstracción y facilidad de uso con PostgreSQL permiten una gestión de datos robusta y un mapeo objeto-relacional eficiente.
  - **Estructura MVC:** El backend está organizado siguiendo el patrón Modelo-Vista-Controlador (MVC), lo que promueve la separación de responsabilidades y la modularidad del código, facilitando el mantenimiento y la escalabilidad.
- **Frontend (React con Vite):**

  - **React:** Se eligió React por su enfoque en componentes reutilizables, lo que agiliza el desarrollo de interfaces de usuario complejas y dinámicas, mejorando la mantenibilidad y la experiencia del usuario.
  - **Vite:** Como herramienta de construcción, Vite fue seleccionado por su velocidad de desarrollo gracias a su arranque instantáneo del servidor y su recarga en caliente (HMR) ultrarrápida.
  - **Tailwind CSS:** Para el estilizado de la interfaz, se implementó Tailwind CSS, un framework CSS que permite construir diseños personalizados rápidamente directamente en el marcado JSX, promoviendo la consistencia y la eficiencia en el diseño.

## Despliegue Local (con Docker Compose)

Antes de comenzar, asegúrate de tener instalado:

- **Docker Desktop:** Incluye Docker Engine y Docker Compose.

### Pasos para Poner en Marcha la Aplicación

1.  **Clonar el Repositorio:**
    Si aún no lo has hecho, clona el repositorio de la aplicación en tu máquina local:

    ```bash
    git clone https://github.com/alejandromoyanom/SSCatFacts.git
    cd SSCatFacts
    ```

2.  **Configurar Variables de Entorno:**
    Crea un archivo `.env` en la raíz del proyecto (junto a `docker-compose.yml`) con las credenciales para la base de datos. Asegúrate de reemplazar `tu_db_name`, `tu_db_user` y `tu_db_password` con los valores que desees:

    ```
    # .env
    DB_NAME=tu_db_name
    DB_USER=tu_db_user
    DB_PASSWORD=tu_db_password
    ```

    _Se recomienda usar nombres de base de datos, usuarios y contraseñas seguras._

3.  **Construir y Levantar los Contenedores:**
    Desde la raíz del proyecto (donde se encuentra `docker-compose.yml`), ejecuta el siguiente comando. Esto construirá las imágenes de Docker para el frontend y el backend, y luego iniciará todos los servicios definidos (base de datos, backend y frontend).

    ```bash
    docker-compose up --build -d
    ```

    - `--build`: Fuerza la reconstrucción de las imágenes. Útil si has realizado cambios en los Dockerfiles o dependencias.
    - `-d`: Ejecuta los contenedores en modo 'detached' (en segundo plano). Puedes omitirlo para ver los logs directamente en tu terminal.

    Puedes verificar el estado de los contenedores con:

    ```bash
    docker-compose ps
    ```

4.  **Acceder a la Aplicación:**
    Una vez que todos los servicios estén en funcionamiento (esto puede tardar unos segundos mientras la base de datos y el backend se inicializan), puedes acceder a la aplicación en tu navegador web:
    ```
    http://localhost:5173
    ```

### Comandos Útiles de Docker Compose

- **Ver los logs de los servicios:**

  ```bash
  docker-compose logs -f
  ```

  Para ver logs de un servicio específico (ej. solo el backend):

  ```bash
  docker-compose logs -f backend
  ```

- **Detener los Contenedores:**

  ```bash
  docker-compose stop
  ```

- **Detener y Eliminar los Contenedores, Redes y Volúmenes:**
  Este comando es útil para hacer una limpieza completa si encuentras problemas o quieres empezar de cero. Eliminará todos los datos de la base de datos (`db_data`) si el volumen es anónimo o si se usa `-v`.

  ```bash
  docker-compose down -v
  ```

- **Reconstruir y Reiniciar Servicios (después de cambios en código o Dockerfiles):**
  ```bash
  docker-compose up --build -d
  ```
      ```
