import React from 'react';
import ReactDOM from 'react-dom/client';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { App } from './App.tsx';
import { GameStateContextProvider } from '@Contexts/GameStateContext.tsx';
import enJSON from './locale/en.json';
import './styles/main.scss';

i18n.use(initReactI18next).init({
    resources: { en: enJSON }, // Where we're gonna put translations' files
    lng: 'en', // Set the initial language of the App
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GameStateContextProvider>
            <I18nextProvider i18n={i18n} defaultNS="translation">
                <App />
            </I18nextProvider>
        </GameStateContextProvider>
    </React.StrictMode>,
);
