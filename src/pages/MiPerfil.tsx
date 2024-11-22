import React, { useEffect, useState } from 'react';
import NavbarSideMenu from '../components/NavbarSideMenu';
import './MiPerfil.css';
import '../components/NavbarSideMenu.css';
import {
  IonModal,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react';

const MiPerfil: React.FC = () => {
  const [usuario, setUsuario] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [formData, setFormData] = useState<any>({}); // Estado para los datos editables

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      console.log('No estás autenticado');
      return;
    }

    const parsedUser = JSON.parse(user);
    setUsuario(parsedUser);
    setFormData(parsedUser); // Inicializar el formulario con los datos del usuario
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Actualizar el estado del formulario
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:3002/usuario`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Enviar los datos editados al servidor
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setUsuario(formData); // Actualizar los datos locales
        localStorage.setItem('user', JSON.stringify(formData)); // Actualizar en localStorage
        setIsModalOpen(false); // Cerrar el modal
        alert('Información actualizada correctamente');
      } else {
        alert('Error al actualizar la información');
      }
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      alert('Error al guardar los cambios');
    }
  };

  return (
    <div className="mi-perfil">
      <NavbarSideMenu /> {/* Componente de Navbar y SideMenu */}

      <div className="perfil-container">
        {usuario ? (
          <div className="perfil-info">
            <h2>Mi Perfil</h2>
            <div className="info-item">
              <strong>Usuario:</strong> {usuario.usuario}
            </div>
            <div className="info-item">
              <strong>Email:</strong> {usuario.email}
            </div>
            <div className="info-item">
              <strong>Rut:</strong> {usuario.rut}
            </div>
            <div className="info-item">
              <strong>Región:</strong> {usuario.region_nombre}
            </div>
            <div className="info-item">
              <strong>Comuna:</strong> {usuario.comuna}
            </div>
            <IonButton expand="block" onClick={() => setIsModalOpen(true)}>
              Editar Información
            </IonButton>
          </div>
        ) : (
          <p>No estás autenticado</p>
        )}
      </div>

      {/* Modal para editar información */}
      <IonModal isOpen={isModalOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Editar Información</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonLabel position="floating">Usuario</IonLabel>
            <IonInput
              name="usuario"
              value={formData.usuario || ''}
              onIonChange={handleInputChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              name="email"
              value={formData.email || ''}
              onIonChange={handleInputChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Rut</IonLabel>
            <IonInput
              name="rut"
              value={formData.rut || ''}
              onIonChange={handleInputChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Región</IonLabel>
            <IonInput
              name="region_nombre"
              value={formData.region_nombre || ''}
              onIonChange={handleInputChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Comuna</IonLabel>
            <IonInput
              name="comuna"
              value={formData.comuna || ''}
              onIonChange={handleInputChange}
            />
          </IonItem>
          <div className="modal-buttons">
            <IonButton expand="block" color="primary" onClick={handleSaveChanges}>
              Guardar Cambios
            </IonButton>
            <IonButton expand="block" color="medium" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </IonButton>
          </div>
        </IonContent>
      </IonModal>
    </div>
  );
};

export default MiPerfil;
