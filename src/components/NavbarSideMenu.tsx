import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonSearchbar, IonLabel, IonRouterLink } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const NavbarSideMenu: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    history.push('/home');
  };

  return (
    <>
      {/* Navbar */}
      <IonHeader>
        <IonToolbar class='nav'>
          <IonButtons slot="start">
            <IonTitle>CalmVibes</IonTitle>
          </IonButtons>
          <IonSearchbar slot="start" placeholder="Buscar..." />
          <IonButtons slot="end">

            <IonButton onClick={handleLogout}>Cerrar sesión</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* Side Menu */}
      <div className="side-menu">
        <ul>

        <li><IonRouterLink href="/principal">Principal</IonRouterLink></li>

          <li><IonRouterLink href="/favoritos">Mis Favoritos</IonRouterLink></li>
          <li><IonRouterLink href="/playlist">Mi Playlist</IonRouterLink></li>
          <li><IonRouterLink href="/ejercicios">Ejercicios</IonRouterLink></li>
          <li><IonRouterLink href="/tips">Tips</IonRouterLink></li>
          <li><IonRouterLink href="/mi-musica">Mi Música</IonRouterLink></li>
          <li><IonRouterLink href="/mi-perfil">Mi Perfil</IonRouterLink></li>
        </ul>
      </div>
    </>
  );
};

export default NavbarSideMenu;
