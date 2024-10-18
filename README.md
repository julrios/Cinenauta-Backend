# Cinenauta Backend

Este es el backend del proyecto **Cinenauta**, un sitio web donde como usuario podés gestionar películas y listas de películas. Este proyecto está construido con Node.js, Express y MongoDB utilizando Mongoose.

## Características

- Gestión de usuarios (registro, login, actualización y eliminación).
- Gestión de listas de películas (creación, actualización, eliminación).
- Gestión de películas (agregar y eliminar películas de listas).
- Autenticación y autorización con JWT.
- Validación de entradas con express-validator.

## Entorno

El proyecto tiene las siguientes variables de entorno:

```env
PORT = your_port
JWT_SECRET = your_private_key
DB_USER = your_db_user
DB_PASS = your_db_password
DB_HOST = your_db_host
DB_OPTIONS = your_db_options
DB_NAME = your_db_name
FRONTEND_URL = your_frontend_url
```

## Instalación

Cloná el repositorio e instalá las dependencias:

```bash
git clone https://github.com/julrios/cinenauta-backend.git
cd cinenauta-backend
npm install
```

## Ejecución del proyecto

Para iniciar el servidor, ejecutá el siguiente comando:

```bash
npm start
```

El servidor debería ejecutarse en el puerto especificado en el archivo `.env`.

## Estructura del proyecto

```
cinenauta-backend/
├── src/
│   ├── controllers/
│   │   ├── listController.js
│   │   ├── movieController.js
│   │   └── userController.js
│   ├── db/
│   │   └── config.js
│   ├── middlewares/
│   │   ├── jwtValidator.js
│   │   └── validateFields.js
│   ├── models/
│   │   ├── List.js
│   │   ├── Movie.js
│   │   └── User.js
│   ├── routes/
│   │   ├── listRoutes.js
│   │   ├── movieRoutes.js
│   │   └── userRoutes.js
│   ├── services/
│   │   ├── listService.js
│   │   ├── movieService.js
│   │   └── userService.js
│   └── index.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Endpoints

### Usuarios

- **POST /users**: Crear un nuevo usuario.
- **POST /users/login**: Iniciar sesión de un usuario.
- **POST /users/logout**: Cerrar sesión de un usuario (protegido).
- **PUT /users/:id**: Actualizar un usuario (protegido).
- **DELETE /users/:id**: Eliminar un usuario (protegido).
- **GET /users/:id**: Obtener un usuario por ID (protegido).
- **GET /users/:id/lists**: Obtener las listas de un usuario por ID (protegido).

### Listas

- **POST /lists**: Crear una nueva lista (protegido).
- **PUT /lists/:id**: Actualizar una lista (protegido).
- **DELETE /lists/:id**: Eliminar una lista (protegido).
- **POST /lists/:id/addMovie**: Agregar una película a una lista (protegido).
- **POST /lists/:id/removeMovie**: Eliminar una película de una lista (protegido).
- **GET /lists/:id**: Obtener una lista por ID (protegido).

### Películas

- **POST /movies**: Crear una nueva película (protegido).
- **GET /movies**: Obtener todas las películas (protegido).
- **GET /movies/:id**: Obtener una película por ID (protegido).
- **GET /movies/title/:title**: Obtener películas por título (protegido).
