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
    en: 'Add',
    mk: 'Додади',
    gr: 'Προσθήκη',
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
  deleteButtonLabels: {
    en: 'Delete',
    mk: 'Избриши',
    gr: 'Διαγραφή',
  },
  topHeading: {
    en: 'Create New Setting',
    mk: 'Новa Поставка',
    gr: 'Δημιουργία Νέας Ρύθμισης',
  },
  editHeading: {
    en: 'Edit Group Name:',
    mk: 'Променете го името на групата:',
    gr: 'Επεξεργασία Ονόματος Ομάδας:',
  },
  radioButtonsTitle: {
    en: 'Select a collection type:',
    mk: 'Изберете тим на колекција:',
    gr: 'Επιλέξτε τύπο συλλογής:',
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
