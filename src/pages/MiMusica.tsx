import React, { useState, useEffect } from 'react';
import NavbarSideMenu from '../components/NavbarSideMenu'; 
import './MiMusica.css';

const MiMusica: React.FC = () => {
  const [archivos, setArchivos] = useState<string[]>([]);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null);
  const [favoritos, setFavoritos] = useState<string[]>([]);

  useEffect(() => {
    obtenerArchivos();
    obtenerFavoritos();
  }, []);

  // Obtener la lista de archivos de música del servidor
  const obtenerArchivos = async () => {
    try {
      const response = await fetch('http://localhost:3002/uploads');
      const data = await response.json();
      setArchivos(data);  // Guardar los archivos de música
    } catch (error) {
      console.error('Error al obtener archivos:', error);
    }
  };

  // Obtener los favoritos desde localStorage
  const obtenerFavoritos = () => {
    const favoritosGuardados = JSON.parse(localStorage.getItem('favoritos') || '[]');
    setFavoritos(favoritosGuardados);
  };

  // Función para manejar la subida de archivos
  const manejarSubida = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!archivoSeleccionado) return;

    const formData = new FormData();
    formData.append('file', archivoSeleccionado);

    try {
      const response = await fetch('http://localhost:3002/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        alert('Archivo subido correctamente');
        obtenerArchivos(); // Actualiza la lista de archivos
      }
    } catch (error) {
      console.error('Error al subir archivo:', error);
      alert('Error al subir archivo');
    }
  };

  // Función para agregar un archivo a favoritos
  const agregarAFavoritos = (archivo: string) => {
    const nuevosFavoritos = [...favoritos, archivo];
    setFavoritos(nuevosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos)); // Guardar en localStorage
  };

  return (
    <div className="mi-musica">
      <NavbarSideMenu />
      <div className="musica-container">
        <h1>Mi Música</h1>
        
        {/* Formulario para subir archivos */}
        <form onSubmit={manejarSubida}>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setArchivoSeleccionado(e.target.files?.[0] || null)}
          />
          <button type="submit">Subir</button>
        </form>

        {/* Mostrar los archivos de música subidos */}
        <h2>Mis Archivos Subidos</h2>
        <div className="lista-musica">
          {archivos.map((archivo, index) => (
            <div className="archivo-item" key={index}>
              <p>{archivo}</p>
              <audio controls>
                <source src={`http://localhost:3002/uploads/${archivo}`} type="audio/mpeg" />
                Tu navegador no soporta el reproductor de audio.
              </audio>
              <button onClick={() => agregarAFavoritos(archivo)}>Favoritos</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiMusica;
