import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar, IonCard, IonCardContent } from '@ionic/react';
import { calculatorOutline, refreshOutline} from 'ionicons/icons';
import {useRef, useState} from "react";
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
    const [ calculatedBMI, setCalculatedBMI ] = useState<number>();
    const [ kategoriBMI, setKategoriBMI ] = useState<string>();
    const heightInputRef = useRef<HTMLIonInputElement>(null);
    const weightInputRef = useRef<HTMLIonInputElement>(null);
    const calculateBMI = () => {
      const enteredWeight = weightInputRef.current!.value;
      const enteredHeight = heightInputRef.current!.value;

      if(!enteredWeight || !enteredHeight) return;

      const bmi = + enteredWeight / ((+enteredHeight/100)*(+enteredHeight/100));

      var kategori;

      if (bmi < 18.5) {
        kategori = "Kurus";
      }
      if(bmi > 18.5 && bmi < 24.9) {
        kategori = "Normal";
      }
      if(bmi > 25 && bmi < 29.9) {
        kategori = "Gemuk";
      }
      if(bmi >= 30) {
        kategori = "Obesitas";
      }

      setCalculatedBMI(bmi);
      setKategoriBMI(kategori);
    };
    const resetInputs = () => {
      weightInputRef.current!.value = '';
      heightInputRef.current!.value = '';
    };


  return(

  <IonApp>
    <IonHeader>
      <IonToolbar>
        <IonTitle>BMI Calculator</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonItem>
          <IonLabel position="floating">Tinggi Badan (cm)</IonLabel>
          <IonInput ref={heightInputRef}></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Berat Badan (kg)</IonLabel>
            <IonInput ref={weightInputRef}></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol className="ion-text-left">
          <IonButton onClick={calculateBMI}>
            <IonIcon slot="start" icon={calculatorOutline}></IonIcon>Calculate
          </IonButton>
        </IonCol>
        <IonCol>
          <IonButton onClick={resetInputs}>
              <IonIcon slot="start" icon={refreshOutline}></IonIcon>Reset
          </IonButton>
        </IonCol>
      </IonRow>
      {calculatedBMI && (<IonRow>
          <IonCol>
              <IonCard>
                  <IonCardContent className="ion-text-center">
                      <h2>{calculatedBMI}</h2>
                      <h2>{kategoriBMI}</h2>
                  </IonCardContent>
              </IonCard>
          </IonCol>
      </IonRow>)}
    </IonGrid>
  </IonApp>
  )
};

export default App;
