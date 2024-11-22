// Importaciones requeridas
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Inicialización de la aplicación Express
const app = express();

// Configuración de middleware
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'CalmVibes',
    password: '1234',
    port: 5432,
});

// ====== Rutas de Autenticación ======

/**
 * Maneja el inicio de sesión de usuarios
 * @ruta POST /login
 * @param {string} email - Correo electrónico del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {objeto} Datos del usuario o mensaje de error
 */
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT id, usuario, email, rut, region_nombre, comuna, password FROM usuarios WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }

        delete user.password;
        res.json({ success: true, user });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
});

/**
 * Maneja el registro de nuevos usuarios
 * @ruta POST /registro
 * @param {objeto} userData - Datos de registro del usuario
 * @returns {objeto} Estado del registro y datos del usuario
 */
app.post('/registro', async (req, res) => {
    const { email, password, rut, region_nombre, comuna, usuario } = req.body;

    try {
        // Verifica si el correo ya existe
        const emailCheck = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (emailCheck.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'El correo electrónico ya está registrado'
            });
        }

        // Verifica si el RUT ya existe
        const rutCheck = await pool.query('SELECT * FROM usuarios WHERE rut = $1', [rut]);
        if (rutCheck.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'El RUT ya está registrado'
            });
        }

        // Encripta la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Inserta el nuevo usuario
        const result = await pool.query(
            'INSERT INTO usuarios (email, password, rut, region_nombre, comuna, usuario) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [email, hashedPassword, rut, region_nombre, comuna, usuario]
        );

        res.json({
            success: true,
            message: 'Usuario registrado exitosamente',
            user: result.rows[0]
        });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({
            success: false,
            message: 'Error al registrar el usuario'
        });
    }
});

// ====== Rutas de Gestión de Usuarios ======

/**
 * Obtiene información de un usuario específico
 * @ruta GET /usuario
 * @returns {objeto} Datos del usuario o mensaje de error
 */
app.get('/usuario', async (req, res) => {
    try {
        const userId = 1; // ID de usuario temporal
        const result = await pool.query(
            'SELECT usuario, email, region_nombre, comuna FROM usuarios WHERE id = $1',
            [userId]
        );

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

/**
 * Actualiza la información de un usuario
 * @ruta PUT /usuario
 * @param {objeto} userData - Datos actualizados del usuario
 * @returns {objeto} Estado de la actualización
 */
app.put('/usuario', async (req, res) => {
    const { usuario, email, rut, region_nombre, comuna } = req.body;

    try {
        const result = await pool.query(
            'UPDATE usuarios SET usuario = $1, email = $2, rut = $3, region_nombre = $4, comuna = $5 WHERE email = $2 RETURNING *',
            [usuario, email, rut, region_nombre, comuna]
        );

        if (result.rowCount > 0) {
            res.json({ success: true, message: 'Datos actualizados correctamente.' });
        } else {
            res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
        }
    } catch (error) {
        console.error('Error al actualizar datos:', error);
        res.status(500).json({ success: false, message: 'Error del servidor.' });
    }
});

/**
 * Obtiene la lista de todos los usuarios
 * @ruta GET /usuarios
 * @returns {array} Lista de usuarios
 */
app.get('/usuarios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

/**
 * Elimina un usuario específico
 * @ruta DELETE /usuario/:id
 * @param {string} id - ID del usuario
 * @returns {objeto} Estado de la eliminación
 */
app.delete('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
        if (result.rowCount > 0) {
            res.json({ success: true, message: 'Usuario eliminado correctamente.' });
        } else {
            res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ success: false, message: 'Error del servidor.' });
    }
});

// ====== Configuración de Carga de Archivos ======

/**
 * Configuración para carga de archivos regulares
 */
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

/**
 * Maneja la carga de archivos
 * @ruta POST /upload
 * @param {archivo} file - Archivo a subir
 * @returns {objeto} Estado de la carga
 */
app.post('/upload', upload.single('file'), (req, res) => {
    try {
        res.json({ success: true, filename: req.file.filename });
    } catch (error) {
        console.error('Error al subir archivo:', error);
        res.status(500).json({ success: false, message: 'Error al subir archivo' });
    }
});

/**
 * Obtiene la lista de archivos subidos
 * @ruta GET /uploads
 * @returns {array} Lista de archivos
 */
app.get('/uploads', (req, res) => {
    const directoryPath = path.join(__dirname, 'uploads');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error al leer la carpeta:', err);
            res.status(500).json({ success: false, message: 'Error al obtener archivos' });
        } else {
            res.json(files);
        }
    });
});

// Hacer los archivos accesibles públicamente
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/**
 * Configuración para carga de archivos principales
 */
const storagePrincipal = multer.diskStorage({
    destination: './uploads-principal',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const uploadPrincipal = multer({ storage: storagePrincipal });

/**
 * Maneja la carga de archivos principales
 * @ruta POST /upload-principal
 * @param {archivo} file - Archivo principal a subir
 * @returns {objeto} Estado de la carga
 */
app.post('/upload-principal', uploadPrincipal.single('file'), (req, res) => {
    try {
        res.json({ success: true, filename: req.file.filename });
    } catch (error) {
        console.error('Error al subir archivo a Principal:', error);
        res.status(500).json({ success: false, message: 'Error al subir archivo' });
    }
});

/**
 * Obtiene la lista de archivos principales
 * @ruta GET /uploads-principal
 * @returns {array} Lista de archivos principales
 */
app.get('/uploads-principal', (req, res) => {
    const directoryPath = path.join(__dirname, 'uploads-principal');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error al leer la carpeta de Principal:', err);
            res.status(500).json({ success: false, message: 'Error al obtener archivos' });
        } else {
            res.json(files);
        }
    });
});

// Hacer los archivos principales accesibles públicamente
app.use('/uploads-principal', express.static(path.join(__dirname, 'uploads-principal')));

// Iniciar el servidor
app.listen(3002, () => {
    console.log('Servidor corriendo en http://localhost:3002');
});