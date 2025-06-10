# SSCatFacts

## Descripción

La Plataforma SSCatFacts es una aplicación web diseñada para los amantes de los gatos, permitiéndoles descubrir y gestionar curiosidades sobre estos felinos. Consiste en un backend que consume una API externa de "Cat Facts" y un frontend interactivo donde los usuarios pueden registrarse, iniciar sesión, explorar nuevos facts, marcar sus favoritos y visualizar los facts más populares de la comunidad. El objetivo es ofrecer una experiencia sencilla y divertida para aprender más sobre los gatos.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (v22.15.0 o superior)
- [npm](https://www.npmjs.com/) (viene con Node.js)
- [PostgreSQL](https://www.postgresql.org/download/)

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

1.  Asegúrate de que la variable `API_URL` en `frontend/src/services/api.js` apunte correctamente a la URL de tu backend. Por defecto, debería ser:

    ```javascript
    // frontend/src/services/api.js
    const API_URL = "http://localhost:3001/api";
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
