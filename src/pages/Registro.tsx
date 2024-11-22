import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  useIonToast
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Registro.css';

const Registro: React.FC = () => {
  const history = useHistory();
  const [present] = useIonToast();
  
  const [formData, setFormData] = useState({
    usuario: '',
    rut: '',
    email: '',
    region_nombre: '',
    comuna: '',
    password: '',
    confirmPassword: ''
  });

  // Lista de regiones de Chile
  const regiones = [
    "Arica y Parinacota",
    "Tarapacá",
    "Antofagasta",
    "Atacama",
    "Coquimbo",
    "Valparaíso",
    "Metropolitana",
    "O'Higgins",
    "Maule",
    "Ñuble",
    "Biobío",
    "La Araucanía",
    "Los Ríos",
    "Los Lagos",
    "Aysén",
    "Magallanes"
  ];

  // Objeto para almacenar las comunas por región
  const comunasPorRegion: { [key: string]: string[] } = {
      "Arica y Parinacota": ["Arica", "Putre", "Camarones"],
      "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte"],
      "Antofagasta": ["Antofagasta", "Calama", "Tocopilla"],
      "Atacama": ["Copiapó", "Vallenar", "Caldera"],
      "Coquimbo": ["La Serena", "Coquimbo", "Ovalle"],
      "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué"],
      "Metropolitana": ["Santiago", "Las Condes", "Providencia"],
      "O'Higgins": ["Rancagua", "San Fernando", "Santa Cruz"],
      "Maule": ["Talca", "Curicó", "Linares"],
      "Ñuble": ["Chillán", "Bulnes", "San Carlos"],
      "Biobío": ["Concepción", "Los Ángeles", "Talcahuano"],
      "La Araucanía": ["Temuco", "Padre Las Casas", "Villarrica"],
      "Los Ríos": ["Valdivia", "La Unión", "Panguipulli"],
      "Los Lagos": ["Puerto Montt", "Osorno", "Castro"],
      "Aysén": ["Coyhaique", "Aysén", "Chile Chico"],
      "Magallanes": ["Punta Arenas", "Puerto Natales", "Porvenir"]
    };
  const handleInputChange = (e: CustomEvent, field: string) => {
    setFormData({
      ...formData,
      [field]: e.detail.value
    });
  };

  const validateForm = () => {
    if (!formData.usuario || !formData.rut || !formData.email || 
        !formData.region_nombre || !formData.comuna || !formData.password || 
        !formData.confirmPassword) {
      present({
        message: 'Por favor complete todos los campos',
        duration: 3000,
        color: 'danger'
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      present({
        message: 'Las contraseñas no coinciden',
        duration: 3000,
        color: 'danger'
      });
      return false;
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      present({
        message: 'Por favor ingrese un email válido',
        duration: 3000,
        color: 'danger'
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:3002/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          rut: formData.rut,
          region_nombre: formData.region_nombre,
          comuna: formData.comuna,
          usuario: formData.usuario
        })
      });

      const data = await response.json();

      if (data.success) {
        present({
          message: 'Registro exitoso',
          duration: 3000,
          color: 'success'
        });
        history.push('/login');
      } else {
        present({
          message: data.message || 'Error en el registro',
          duration: 3000,
          color: 'danger'
        });
      }
    } catch (error) {
      present({
        message: 'Error de conexión',
        duration: 3000,
        color: 'danger'
      });
    }
  };

  return (
    <IonPage className="registro-page">
      <IonHeader>
        
      </IonHeader>
      <IonContent className="ion-padding registro-content">
        <div className="registro-container">
          <form onSubmit={handleSubmit} className="registro-form">
          <IonLabel position="floating">Nombre Usuario</IonLabel>
            <IonItem>
              <IonInput
                type="text"
                value={formData.usuario}
                onIonChange={(e) => handleInputChange(e, 'usuario')}
              
              />
            </IonItem>
            <IonLabel position="floating">RUT</IonLabel>
            <IonItem>
              
              <IonInput
                type="text"
                value={formData.rut}
                onIonChange={(e) => handleInputChange(e, 'rut')}
                placeholder='12345678-9'
              />
            </IonItem>
            <IonLabel position="floating">Correo Electrónico</IonLabel>
            <IonItem>
              
              <IonInput
                type="email"
                value={formData.email}
                onIonChange={(e) => handleInputChange(e, 'email')}
              />
            </IonItem>
            <IonLabel position="floating">Región</IonLabel>
            <IonItem>
              
              <IonSelect
                value={formData.region_nombre}
                onIonChange={(e) => handleInputChange(e, 'region_nombre')}
              >
                {regiones.map((region) => (
                  <IonSelectOption key={region} value={region}>
                    {region}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonLabel position="floating">Comuna</IonLabel>
            <IonItem>
              
              <IonSelect
                value={formData.comuna}
                onIonChange={(e) => handleInputChange(e, 'comuna')}
                disabled={!formData.region_nombre}
              >
                {formData.region_nombre && comunasPorRegion[formData.region_nombre]?.map((comuna) => (
                  <IonSelectOption key={comuna} value={comuna}>
                    {comuna}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonItem>
              
              <IonInput
                type="password"
                value={formData.password}
                onIonChange={(e) => handleInputChange(e, 'password')}
              />
            </IonItem>
            <IonLabel position="floating">Confirmar Contraseña</IonLabel>
            <IonItem>
              
              <IonInput
                type="password"
                value={formData.confirmPassword}
                onIonChange={(e) => handleInputChange(e, 'confirmPassword')}
              />
            </IonItem>

            <IonButton 
              expand="block" 
              type="submit" 
              className="registro-button"
              color={'none'}
              
            >
              Registrarse
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Registro;