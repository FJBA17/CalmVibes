import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonLabel, IonItem, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleLogin = () => {
        if (username === 'admin' && password === '1234') {
            history.push('/principal');
        } else {
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Inicio de Sesión</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel position="stacked">Usuario</IonLabel>
                    <IonInput value={username} onIonChange={(e) => setUsername(e.detail.value!)} placeholder="Ingresa usuario"></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Contraseña</IonLabel>
                    <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} placeholder="Ingresa contraseña"></IonInput>
                </IonItem>
                {error && (
                    <IonText color="danger">
                        <p>{error}</p>
                    </IonText>
                )}
                <IonButton expand="block" onClick={handleLogin}>Iniciar Sesión</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Login;
