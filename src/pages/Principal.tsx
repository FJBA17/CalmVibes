import React, { useState } from 'react';
import './Principal.css'; // Asegúrate de tener un archivo CSS para estilos

const Principal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true); // Abre el modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cierra el modal
  };

  const handleLike = () => {
    alert('¡Te gusta!');
  };

  const handleDislike = () => {
    alert('¡No te gusta!');
  };

  const handleFavorite = () => {
    alert('Agregado a favoritos');
  };

  return (
    <div className="principal-page">
      <nav className="navbar">
        <div className="navbar-title">CalmVibes</div>
        <div className="search-container">
          <input type="text" className="search-input" placeholder="Buscar..." />
        </div>
      </nav>
      <div className="layout">
        <aside className="sidebar">
          <ul className="menu">
            <li>Principal</li>
            <li>Explorar</li>
            <li>My Playlist</li>
            <li>Ejercicios</li>
            <li>Tips</li>
            <li>Subir Contenido</li>
          </ul>
        </aside>
        <div className="content">
          <h1>Bienvenido a CalmVibes</h1>
          <div className="song-card" onClick={handleCardClick}>
            <h2 className="song-title">Nombre Canción</h2>
            <p className="artist-name">Nombre Artista</p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Este es el contenido del modal</h2>
            <p>Puedes agregar más información aquí.</p>
            
          </div>
          {/* Reproductor de música al final del modal */}
          <div className="music-player">
              <button className="control-btn">⏪</button>
              <button className="control-btn">▶️</button>
              <button className="control-btn">⏩</button>
              <input type="range" className="progress-bar" />
              <button className="like-btn" onClick={handleLike}>👍</button>
              <button className="dislike-btn" onClick={handleDislike}>👎</button>
              <button className="favorite-btn" onClick={handleFavorite}>❤️</button>
              <button className="volume-btn">🔊</button>
            </div>
        </div>
      )}
    </div>
  );
};

export default Principal;
