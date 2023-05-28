import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { getUserLocaleLang } from './features/auth/localeUtils';

i18n
  .use(resourcesToBackend((language, namespace) => import(`../public/locales/${language}/${namespace}.json`)))
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: getUserLocaleLang(),
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
