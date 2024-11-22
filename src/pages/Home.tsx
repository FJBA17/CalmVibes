import React from 'react';
import './Home.css'; // Asegúrate de tener este archivo para los estilos
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
} from '@ionic/react';

const Home: React.FC = () => {
  return (
    <IonPage className='body'>
      {/* Navbar */}
      <IonHeader>
        <IonToolbar className="toolbar-container" color='white'>
          <IonTitle slot="start" className="logo">CalmVibes</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/inicio">Inicio</IonButton>
            <IonButton routerLink="/acerca">Acerca</IonButton>
            <IonButton routerLink="/servicios">Servicios</IonButton>
            <IonButton routerLink="/contacto">Contacto</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>



      {/* Contenido */}
      <IonContent>
        <div className="home-container">
          <h1 className='titulo'>Transforma tu Bienestar</h1>
          <p>Descubre una nueva forma de cuidar tu salud y relajación con
                    CalmVibes. Nuestra aplicación te permite crear playlists
                    personalizadas que se adaptan a tus momentos de calma,
                    explorar
                    ejercicios guiados para meditación y estiramientos, y
                    recibir
                    consejos diarios diseñados para mejorar tu bienestar
                    general.
                    Con CalmVibes, cada día es una oportunidad para encontrar
                    equilibrio y serenidad. Únete a nosotros y empieza tu viaje
                    hacia una vida más tranquila y saludable.</p>

          {/* Botones de Inicio de Sesión y Registro */}
          <div className="button-container">
            <IonButton className='login' expand="block" color="white"  routerLink="/login">
              Inicio de Sesión
            </IonButton>
            <IonButton className='register' expand="block" color="none" routerLink="/registro">
              Registro
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
