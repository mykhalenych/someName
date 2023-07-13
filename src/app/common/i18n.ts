import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

import TranslationEn from '../../../public/locales/en/translation.json';
import TranslationUa from '../../../public/locales/ua/translation.json';
import NotificationEn from '../../../public/locales/en/notification.json';
import NotificationUa from '../../../public/locales/en/notification.json';
import ValidationUa from '../../../public/locales/en/validation.json';
import ValidationEn from '../../../public/locales/en/validation.json';

i18n
    .use(Backend)
    .use(initReactI18next).init({
        lng: 'en',
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
            translation: TranslationEn,
            notification: NotificationEn,
            validation: ValidationUa,
            },
            ua: {
            translation: TranslationUa,
            notification: NotificationUa,
            validation: ValidationEn,
            }
        },
});

export default i18n;