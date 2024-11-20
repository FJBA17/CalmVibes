import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonLabel, IonItem, IonCheckbox, IonText } from '@ionic/react';
// import './Registro.css'
const Registro: React.FC = () => {
    const [username, setUsername] = useState('');
    const [rut, setRut] = useState('');
    const [email, setEmail] = useState('');
    const [region, setRegion] = useState('');
    const [comuna, setComuna] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = () => {
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        if (!acceptTerms) {
            setError('Debe aceptar los términos y condiciones');
            return;
        }
        // Lógica adicional de registro aquí
        setError('');
        console.log('Usuario registrado:', { username, rut, email, region, comuna });
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Registro</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel position="stacked">Nombre de usuario</IonLabel>
                    <IonInput value={username} onIonChange={(e) => setUsername(e.detail.value!)} placeholder="Ingresa tu nombre de usuario" />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">RUT</IonLabel>
                    <IonInput value={rut} onIonChange={(e) => setRut(e.detail.value!)} placeholder="Ingresa tu RUT" />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Correo Electrónico</IonLabel>
                    <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} placeholder="Ingresa tu correo electrónico" />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Región</IonLabel>
                    <IonInput value={region} onIonChange={(e) => setRegion(e.detail.value!)} placeholder="Ingresa tu región" />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Comuna</IonLabel>
                    <IonInput value={comuna} onIonChange={(e) => setComuna(e.detail.value!)} placeholder="Ingresa tu comuna" />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Contraseña</IonLabel>
                    <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} placeholder="Ingresa tu contraseña" />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Confirmar Contraseña</IonLabel>
                    <IonInput type="password" value={confirmPassword} onIonChange={(e) => setConfirmPassword(e.detail.value!)} placeholder="Confirma tu contraseña" />
                </IonItem>
                {/* <IonItem>
                    <IonCheckbox checked={acceptTerms} onIonChange={(e) => setAcceptTerms(e.detail.checked!)} />
                    <IonLabel>Acepto los términos y condiciones</IonLabel>
                </IonItem> */}
                {error && (
                    <IonText color="danger">
                        <p>{error}</p>
                    </IonText>
                )}
                <IonButton expand="block" onClick={handleRegister}>Registrar</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Registro;
