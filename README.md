# SSCatFacts

## Descripción

La Plataforma SSCatFacts es una aplicación web diseñada para los amantes de los gatos, permitiéndoles descubrir y gestionar curiosidades sobre estos felinos. Consiste en un backend que consume una API externa de "Cat Facts" y un frontend interactivo donde los usuarios pueden registrarse, iniciar sesión, explorar nuevos *facts*, marcar sus favoritos y visualizar los *facts* más populares de la comunidad. El objetivo es ofrecer una experiencia sencilla y divertida para aprender más sobre los gatos.

## Tabla de Contenidos

1.  [Requisitos Previos](#requisitos-previos)
2.  [Instalación](#instalación)
3.  [Configuración](#configuración)
    * [Backend](#backend)
    * [Frontend](#frontend)
4.  [Ejecución Local (Sin Docker)](#ejecución-local-sin-docker)
    * [Backend](#backend-1)
    * [Frontend](#frontend-1)
5.  [Despliegue Local (con Docker Compose)](#despliegue-local-con-docker-compose)
    * [Requisitos Previos](#requisitos-previos-1)
    * [Pasos para Poner en Marcha la Aplicación](#pasos-para-poner-en-marcha-la-aplicación)
6.  [Comandos Útiles de Docker Compose](#comandos-útiles-de-docker-compose)
7.  [Decisiones de Diseño](#decisiones-de-diseño)

---

## Requisitos Previos

Para ejecutar este proyecto, necesitas tener instalado:

* **Node.js:** (v22.15.0 o superior) - [Descargar Node.js](https://nodejs.org/) (incluye npm)
* **npm:** (viene con Node.js)
* **PostgreSQL:** (Solo si ejecutas la aplicación **sin Docker**) - [Descargar PostgreSQL](https://www.postgresql.org/download/)
* **Docker Desktop:** (Solo si ejecutas la aplicación **con Docker Compose**) - [Descargar Docker Desktop](https://www.docker.com/products/docker-desktop)

## Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/alejandromoyanom/SSCatFacts.git](https://github.com/alejandromoyanom/SSCatFacts.git)
    ```

2.  **Navega al directorio del proyecto:**
    ```bash
    cd SSCatFacts
    ```

3.  **Instala las dependencias del backend:**
    ```bash
    cd backend
    npm install
    ```

4.  **Instala las dependencias del frontend:**
    ```bash
    cd ../frontend
    npm install
    ```

## Configuración

### Backend

1.  Crea un archivo `.env` en el directorio `backend` con las siguientes variables de entorno para la conexión a la base de datos local:

    ```
    DB_NAME=nombre_de_tu_base_de_datos # Por ejemplo: catfacts_db
    DB_USER=usuario_de_tu_db          # Por ejemplo: postgres
    DB_PASSWORD=tu_password_de_db     # Por ejemplo: mysecretpassword
    DB_HOST=localhost                 # O la IP de tu servidor de DB
    PORT=3001
    ```
    **Nota:** Asegúrate de que tienes una base de datos PostgreSQL creada con el nombre y credenciales especificadas en tu sistema local si no utilizas Docker.

### Frontend

1.  La variable `baseURL` en `frontend/src/services/api.js` está configurada para apuntar correctamente a la ruta base de tu API. Debería ser solo la ruta relativa `/api` para que el proxy de Vite funcione correctamente en desarrollo.

    ```javascript
    // frontend/src/services/api.js
    const API_BASE_PATH = "/api";

    const api = axios.create({
      baseURL: API_BASE_PATH,
    });
    // ...
    ```
    Internamente, Vite gestionará si esta ruta se redirige a `http://localhost:3001/api` (cuando ejecutas el backend localmente) o a `http://backend:3001/api` (cuando utilizas Docker Compose).

## Ejecución Local (Sin Docker)

Para levantar la aplicación sin Docker (requiere que tengas Node.js y una base de datos PostgreSQL instalados y configurados localmente):

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

## Despliegue Local (con Docker Compose)

Esta aplicación está diseñada para ser ejecutada fácilmente utilizando Docker Compose, lo que encapsula tanto el backend (Node.js/Express) como el frontend (React/Vite) y la base de datos (PostgreSQL) en contenedores aislados.

### Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

* **Docker Desktop:** Incluye Docker Engine y Docker Compose. Puedes descargarlo desde [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop).

### Pasos para Poner en Marcha la Aplicación

1.  **Clonar el Repositorio:**
    Si aún no lo has hecho, clona el repositorio de la aplicación:
    ```bash
    git clone https://github.com/alejandromoyanom/SSCatFacts.git
    cd SSCatFacts
    ```

2.  **Configurar Variables de Entorno para Docker:**
    Crea un archivo `.env` en la **raíz del proyecto** (junto a `docker-compose.yml`) con las credenciales para la base de datos que Docker Compose utilizará:
    ```
    # .env
    DB_NAME=nombre_docker_db # Ej: catfacts_docker_db
    DB_USER=usuario_docker   # Ej: docker_user
    DB_PASSWORD=password_docker # Ej: mysecurepassword
    ```
    _Se recomienda usar nombres de base de datos, usuarios y contraseñas seguras, distintos a los de tu configuración local si los tienes._

3.  **Construir y Levantar los Contenedores:**
    Desde la raíz del proyecto (donde se encuentra `docker-compose.yml`), ejecuta el siguiente comando. Esto construirá las imágenes de Docker para el frontend y el backend, y luego iniciará todos los servicios definidos (base de datos, backend y frontend).
    ```bash
    docker-compose up --build -d
    ```
    * `--build`: Fuerza la reconstrucción de las imágenes. Útil si has realizado cambios en los Dockerfiles o dependencias.
    * `-d`: Ejecuta los contenedores en modo 'detached' (en segundo plano). Puedes omitirlo para ver los logs directamente en tu terminal.

    Puedes verificar el estado de los contenedores con:
    ```bash
    docker-compose ps
    ```

4.  **Acceder a la Aplicación:**
    Una vez que todos los servicios estén en funcionamiento (esto puede tardar unos segundos mientras la base de datos y el backend se inicializan), puedes acceder a la aplicación en tu navegador web:
    ```
    http://localhost:5173
    ```

## Comandos Útiles de Docker Compose

* **Ver los logs de los servicios:**
    ```bash
    docker-compose logs -f
    ```
    Para ver logs de un servicio específico (ej. solo el backend):
    ```bash
    docker-compose logs -f backend
    ```

* **Detener los Contenedores:**
    ```bash
    docker-compose stop
    ```

* **Detener y Eliminar los Contenedores, Redes y Volúmenes:**
    Este comando es útil para hacer una limpieza completa si encuentras problemas o quieres empezar de cero. Eliminará todos los datos de la base de datos (`db_data`) de los volúmenes persistentes.
    ```bash
    docker-compose down -v
    ```

* **Reconstruir y Reiniciar Servicios (después de cambios en código o Dockerfiles):**
    ```bash
    docker-compose up --build -d
    ```

## Decisiones de Diseño

* **Arquitectura:** El proyecto sigue una arquitectura **Monorepo** para gestionar el backend y el frontend en un único repositorio, lo que facilita la colaboración, la gestión de versiones y la coherencia del desarrollo.

* **Backend (Node.js con Express):**
    * **Express:** Se eligió Express por su simplicidad y flexibilidad para crear APIs RESTful de manera eficiente, ofreciendo un entorno ligero y robusto para el servidor.
    * **Sequelize ORM:** Para la interacción con la base de datos relacional, se optó por Sequelize ORM. Su potente abstracción y facilidad de uso con PostgreSQL permiten una gestión de datos robusta, un mapeo objeto-relacional eficiente y la aplicación de migraciones.
    * **Estructura MVC:** El backend está organizado siguiendo el patrón Modelo-Vista-Controlador (MVC), lo que promueve la separación de responsabilidades, la modularidad del código y la legibilidad, facilitando el mantenimiento y la escalabilidad.

* **Frontend (React con Vite):**
    * **React:** Se eligió React por su enfoque en componentes reutilizables y declarativos, lo que agiliza el desarrollo de interfaces de usuario complejas y dinámicas, mejorando significativamente la mantenibilidad y la experiencia del usuario.
    * **Vite:** Como herramienta de construcción (build tool), Vite fue seleccionado por su velocidad de desarrollo inigualable. Ofrece un arranque instantáneo del servidor y una recarga en caliente (HMR) ultrarrápida, lo que mejora drásticamente la productividad del desarrollador.
    * **Tailwind CSS:** Para el estilizado de la interfaz, se implementó Tailwind CSS, un *framework* CSS. Permite construir diseños personalizados rápidamente directamente en el marcado JSX, promoviendo la consistencia visual y la eficiencia en el diseño.
