import React, { useState, useEffect } from 'react';
import NavbarSideMenu from '../components/NavbarSideMenu'; 
import './MisFavoritos.css';

const MisFavoritos: React.FC = () => {
  const [favoritos, setFavoritos] = useState<string[]>([]);

  useEffect(() => {
    obtenerFavoritos();
  }, []);

  // Obtener los favoritos desde localStorage
  const obtenerFavoritos = () => {
    const favoritosGuardados = JSON.parse(localStorage.getItem('favoritos') || '[]');
    setFavoritos(favoritosGuardados);
  };

  // Función para eliminar un archivo de los favoritos
  const eliminarFavorito = (archivo: string) => {
    const nuevosFavoritos = favoritos.filter((item) => item !== archivo); // Filtra los favoritos
    setFavoritos(nuevosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos)); // Actualiza localStorage
  };

  return (
    <div className="mis-favoritos">
      <NavbarSideMenu />
      <div className="favoritos-container">
        <h1>Mis Favoritos</h1>
        {favoritos.length > 0 ? (
          <div className="favoritos-lista">
            {favoritos.map((archivo, index) => (
              <div className="favorito-item" key={index}>
                <p>{archivo}</p>
                <audio controls>
                  <source src={`http://localhost:3002/uploads/${archivo}`} type="audio/mpeg" />
                  Tu navegador no soporta el reproductor de audio.
                </audio>
                <button className="delete-button" onClick={() => eliminarFavorito(archivo)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No tienes canciones en tus favoritos</p>
        )}
      </div>
    </div>
  );
};

export default MisFavoritos;
