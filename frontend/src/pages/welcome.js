import React from "react";
import { IonButton, IonContent, IonImg, IonPage } from "@ionic/react";
import "../style/welcome.css";
import { useTranslation } from 'react-i18next';
import SeekBarLogo from "../assets/img/LogoSeekBar.png";

const SBwelcome = () => {
  const { t } = useTranslation();


  return (
    <IonPage>
      <IonContent fullscreen className="sb-welcome-page">
        <main className="sb-welcome-page">
          <section>
            <IonImg className="sb-welcome-logo" src={SeekBarLogo}></IonImg>
          </section>
          <section>
            <IonButton color="dark" className="sb-welcome-btnStart" href="/home">
              {t('welcome.start')}
            </IonButton>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default SBwelcome;
