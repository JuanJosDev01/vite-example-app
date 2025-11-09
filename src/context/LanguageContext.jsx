/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import esTranslations from '../locales/es.json';
import nahTranslations from '../locales/nah.json';

// Crear el contexto
const LanguageContext = createContext();

// Hook personalizado para usar el contexto
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe ser usado dentro de LanguageProvider');
  }
  return context;
};

// Provider del contexto
export const LanguageProvider = ({ children }) => {
  // Obtener idioma guardado en localStorage o usar 'es' como predeterminado
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('language') || 'es';
  });

  // Guardar el idioma en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
  }, [currentLanguage]);

  // Función para cambiar entre idiomas
  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'es' ? 'nah' : 'es');
  };

  // Función para obtener el campo correcto según el idioma
  const getFieldByLanguage = (obj, fieldName) => {
    if (!obj) return '';
    const field = `${fieldName}_${currentLanguage}`;
    return obj[field] || obj[`${fieldName}_es`] || '';
  };

  // Traducciones importadas desde archivos JSON
  const translations = {
    es: esTranslations,
    nah: nahTranslations
  };

  // Función para obtener traducciones
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    return value || key;
  };

  const value = {
    currentLanguage,
    setCurrentLanguage,
    toggleLanguage,
    getFieldByLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

