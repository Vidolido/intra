'use client';

import { createContext, useContext } from 'react';

export const StaticSettingsContext = createContext();

const staticState = {
  languages: ['en', 'mk', 'gr'],
  placeholder: {
    en: 'Pleace add a Group Name',
    mk: 'Запишете име на групата',
    gr: 'Παρακαλώ προσθέστε ένα όνομα για την ομάδα',
  },
  addButtonLabels: {
    en: 'Add group',
    mk: 'Додади група',
    gr: 'Προσθήκη grupou',
  },
  editButtonLabels: {
    en: 'Edit',
    mk: 'Измени',
    gr: 'Επεξ',
  },
  saveButtonLabels: {
    en: 'Save',
    mk: 'Зачувај',
    gr: 'Αποθηκεύστε',
  },
  radioButtonTypes: {
    // треба да бидат сите 3 во различни јазици
    single: 'Simple Values',
    translatedString: 'Translations',
    limit: 'Limits',
  },
};

export const StaticSettingsContextProvider = ({ children }) => {
  return (
    <StaticSettingsContext.Provider value={staticState}>
      {children}
    </StaticSettingsContext.Provider>
  );
};

export const useStaticSettingsContext = () => useContext(StaticSettingsContext);
