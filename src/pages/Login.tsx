import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
} from "@ionic/react";
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async () => {
    const response = await fetch('http://localhost:3002/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
  
    if (response.ok && data.success) {
      localStorage.setItem('user', JSON.stringify(data.user)); // Guardar los datos del usuario
  
      if (data.user.email === 'pancho@calmvibes.cl') {
        history.push('/admin'); // Redirigir al panel de administración
      } else {
        history.push('/principal'); // Redirigir a la página principal
      }
    } else {
      alert('Credenciales incorrectas');
    }
  };
  
  
  return (
    <IonPage className="login-page">
      <IonHeader>
        {/* <IonToolbar>
          <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar> */}
      </IonHeader>
      <IonContent className="ion-padding login-content">
        <div className="login-container">
          <h1>Inicio de Sesión</h1>
          <IonLabel position="floating" className="label" >Correo Electrónico</IonLabel>
          <IonItem>
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            />
          </IonItem>
          <IonLabel position="floating" className="label" >Contraseña</IonLabel>
          <IonItem>
            
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            />
          </IonItem>
          <IonButton expand="block" onClick={handleLogin} className="ion-button" color={'white'}>
            Acceder
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;