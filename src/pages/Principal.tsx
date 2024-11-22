import React, { useState, useEffect } from 'react';
import NavbarSideMenu from '../components/NavbarSideMenu';
import './Principal.css';

const Principal: React.FC = () => {
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
      const response = await fetch('http://localhost:3002/uploads-principal');
      const data = await response.json();
      setArchivos(data);
    } catch (error) {
      console.error('Error al obtener archivos:', error);
    }
  };

  // Obtener favoritos desde localStorage
  const obtenerFavoritos = () => {
    const favoritosGuardados = JSON.parse(localStorage.getItem('favoritos-principal') || '[]');
    setFavoritos(favoritosGuardados);
  };

  // Manejar subida de archivos para Principal
  const manejarSubida = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!archivoSeleccionado) return;

    const formData = new FormData();
    formData.append('file', archivoSeleccionado);

    try {
      const response = await fetch('http://localhost:3002/upload-principal', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        alert('Archivo subido correctamente a Principal');
        obtenerArchivos();
      }
    } catch (error) {
      console.error('Error al subir archivo:', error);
      alert('Error al subir archivo');
    }
  };

  // Agregar a favoritos
  const agregarAFavoritos = (archivo: string) => {
    const nuevosFavoritos = [...favoritos, archivo];
    setFavoritos(nuevosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos)); 
    alert(`"${archivo}" añadido a favoritos`);// Guardar en localStorage
  };
  
  // Función para manejar Like y Dislike
  const manejarLike = (tipo: string) => {
    alert(`Has dado ${tipo === 'like' ? 'un like' : 'un dislike'}`);
  };

  return (
    <div className="principal-page">
      <NavbarSideMenu />
      <div className="principal-container">
        <h1>Principal</h1>

        {/* Formulario para subir archivos */}
        {/* <form onSubmit={manejarSubida}>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setArchivoSeleccionado(e.target.files?.[0] || null)}
          />
          <button type="submit" className='Subir'>Subir Música</button>
        </form> */}

        {/* Lista de música */}
        <div className="principal-music-list">
          {archivos.map((archivo, index) => (
            <div className="music-item" key={index}>
              <p>{archivo}</p>
              <audio controls>
                <source src={`http://localhost:3002/uploads-principal/${archivo}`} type="audio/mpeg" />
                Tu navegador no soporta el reproductor de audio.
              </audio>
              <button onClick={() => agregarAFavoritos(archivo)}>Favorito</button>
              <button onClick={() => manejarLike('like')}>Like</button>
              <button onClick={() => manejarLike('dislike')}>Dislike</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Principal;
