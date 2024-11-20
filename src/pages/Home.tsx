import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
    const history = useHistory();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonButton expand="block" onClick={() => history.push('/login')}>Inicio de Sesión</IonButton>
                <IonButton expand="block" onClick={() => history.push('/registro')}>Registro</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Home;
