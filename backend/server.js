const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs'); // Esto es necesario para trabajar con archivos

const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',         // Cambiar con tu nombre de usuario de PostgreSQL
    host: 'localhost',
    database: 'CalmVibes',
    password: '1234',
    port: 5432,
});



app.use(cors()); // Permite las solicitudes desde cualquier origen (puedes ajustar según tus necesidades)
app.use(express.json()); // Para interpretar el cuerpo JSON de las solicitudes
const bcrypt = require('bcrypt');

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Consulta para obtener los datos del usuario por email
    const result = await pool.query(
      'SELECT id, usuario, email, rut, region_nombre, comuna, password FROM usuarios WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      // Si no se encuentra el email, devuelve un error
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }

    const user = result.rows[0];

    // Comparar la contraseña ingresada con el hash almacenado
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // Si la contraseña no coincide, devuelve un error
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }

    // Si todo es correcto, elimina la contraseña del objeto antes de enviarlo
    delete user.password;

    // Responder con los datos del usuario
    res.json({ success: true, user });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
});

  
  
  

// Añade esto a tu server.js actual



app.post('/registro', async (req, res) => {
  const { email, password, rut, region_nombre, comuna, usuario } = req.body;

  try {
    // Verificar si el email ya existe
    const emailCheck = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    );

    if (emailCheck.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'El correo electrónico ya está registrado'
      });
    }

    // Verificar si el RUT ya existe
    const rutCheck = await pool.query(
      'SELECT * FROM usuarios WHERE rut = $1',
      [rut]
    );

    if (rutCheck.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'El RUT ya está registrado'
      });
    }

    // Hashear la contraseña antes de almacenarla
    const saltRounds = 10; // Complejidad del hash
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insertar el nuevo usuario en la base de datos
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


app.get('/usuario', async (req, res) => {
    try {
      const userId = 1; // Ejemplo: cambia esto para identificar al usuario que inició sesión
      const result = await pool.query('SELECT usuario, email, region_nombre, comuna FROM usuarios WHERE id = $1', [userId]);
  
      if (result.rows.length > 0) {
        res.json(result.rows[0]); // Devuelve los datos del usuario
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  });

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
  
  app.get('/usuarios', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM usuarios');
      res.json(result.rows); // Devuelve todos los usuarios
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  });
  
  app.delete('/usuario/:id', async (req, res) => {
    const { id } = req.params; // ID del usuario a eliminar
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
  


  //Musica

  // Configuración de almacenamiento para Multer
  const multer = require('multer');
  const path = require('path');
  
  // Configurar almacenamiento para los archivos
  const storage = multer.diskStorage({
    destination: './uploads', // Carpeta donde se guardarán los archivos
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Nombre único para cada archivo
    },
  });
  
  const upload = multer({ storage });
  
  // Ruta para subir archivos
  app.post('/upload', upload.single('file'), (req, res) => {
    try {
      res.json({ success: true, filename: req.file.filename });
    } catch (error) {
      console.error('Error al subir archivo:', error);
      res.status(500).json({ success: false, message: 'Error al subir archivo' });
    }
  });
  
  // Ruta para obtener archivos subidos
  app.get('/uploads', (req, res) => {
    const fs = require('fs');
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
  
  // Hacer que los archivos sean accesibles públicamente
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  
  


  // Configuración de almacenamiento para Principal
const storagePrincipal = multer.diskStorage({
  destination: './uploads-principal', // Nueva carpeta para Principal
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadPrincipal = multer({ storage: storagePrincipal });

// Ruta para subir archivos (Principal)
app.post('/upload-principal', uploadPrincipal.single('file'), (req, res) => {
  try {
    res.json({ success: true, filename: req.file.filename });
  } catch (error) {
    console.error('Error al subir archivo a Principal:', error);
    res.status(500).json({ success: false, message: 'Error al subir archivo' });
  }
});

// Ruta para obtener archivos subidos (Principal)
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

// Hacer accesibles los archivos de Principal
app.use('/uploads-principal', express.static(path.join(__dirname, 'uploads-principal')));







app.listen(3002, () => {
    console.log('Servidor corriendo en http://localhost:3002');
});
