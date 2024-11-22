import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Login from "./pages/Login"; // Importa la página Login
import Principal from "./pages/Principal"; // Importa la página Principal
import Registro from "./pages/Registro"; // Importa la página Registro
import MiPerfil from './pages/MiPerfil'; // Asegúrate de que la ruta sea correcta
import AdminPage from './pages/AdminPage'; // Cambia la ruta según la ubicación de tu archivo
import MiMusica from './pages/MiMusica'; // Importa la página MiMusica
import MisFavoritos from './pages/MisFavoritos'; // Nueva página MisFavoritos

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/structure.css";
// import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Ionic Dark Mode */
import "@ionic/react/css/palettes/dark.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Página Home */}
        <Route exact path="/home">
          <Home />
        </Route>

        {/* Página de Login */}
        <Route exact path="/login">
          <Login />
        </Route>

        {/* Página de Registro */}
        <Route exact path="/registro">
          <Registro /> {/* Ruta para la página Registro */}
        </Route>

        {/* Página Principal */}
        <Route exact path="/principal">
          <Principal />
        </Route>

        {/* Página Admin */}
        <Route path="/admin" component={AdminPage} exact />

        {/* Página Mi Perfil */}
        <Route path="/mi-perfil" component={MiPerfil} />

        {/* Página Mi Musica */}
        <Route path="/mi-musica" component={MiMusica} exact />

        {/* Página Mis Favoritos */}
        <Route path="/favoritos" component={MisFavoritos} exact />

        {/* Redirección predeterminada */}
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
