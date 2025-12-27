import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { "Creating Lasting Impact": "Creating Lasting Impact" } },
    fr: { translation: { "Creating Lasting Impact": "Créer un impact durable" } },
    es: { translation: { "Creating Lasting Impact": "Creando un impacto duradero" } },
    hi: { translation: { "Creating Lasting Impact": "स्थायी प्रभाव बनाना" } },
    mr: { translation: { "Creating Lasting Impact": "शाश्वत प्रभाव निर्माण करणे" } },
    // … add more languages here
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
