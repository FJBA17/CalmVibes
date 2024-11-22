*CalmVibes*

CalmVibes es una innovadora plataforma web diseñada para ofrecer una experiencia de música y video personalizada que fomenta el bienestar y la relajación del usuario. Los usuarios pueden explorar, crear y gestionar listas de reproducción con música relajante, además de subir y gestionar su propio contenido.

Configuración de la base de datos
1. Crear la base de datos
Crea una base de datos en PostgreSQL llamada CalmVibes:
CREATE DATABASE CalmVibes;

2. Crear las tablas necesarias
Tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    rut VARCHAR(15) UNIQUE NOT NULL,
    region_nombre VARCHAR(255),
    comuna VARCHAR(255),
    usuario VARCHAR(255) NOT NULL
);

-- Tabla para almacenar favoritos
CREATE TABLE favoritos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    archivo_nombre VARCHAR(255) NOT NULL
);


Arrancar Servidor Backend
Entrando a la carpeta backend : cd backend:
node server.js


Instalar Dependencias

Tecnologías utilizadas
Frontend: React, Ionic
Backend: Node.js, Express
Base de datos: PostgreSQL
Seguridad: bcrypt para hashing de contraseñas, JWT para autenticación
