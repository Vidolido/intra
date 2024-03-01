import { useState } from 'react';
import { useSettingsContext } from '@/app/dashboard/_state/settings/useSettingsContext';

import {
  ADD_GROUPNAME,
  SET_COLLECTION_TYPE,
  SET_COLLECTION,
  EXTRACT_DATA,
} from '@/app/dashboard/_state/settings/actionTypes';

export const useSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    extractedData,
    groupName,
    collectionType,
    collection,
    language,
    buttonTypes,
    dispatch,
  } = useSettingsContext();

  const setExtractedData = (data) => {
    console.log(data);
    dispatch({ type: EXTRACT_DATA, payload: data });
  };

  const setGroupName = (groupName) => {
    dispatch({ type: ADD_GROUPNAME, payload: groupName });
  };

  const setCollectionType = (type) => {
    console.log(type, 'TYPE IN USESETTINGS');
    dispatch({ type: SET_COLLECTION_TYPE, payload: type });
  };
  const setCollection = (item) => {
    dispatch({ type: SET_COLLECTION, payload: item });
  };

  return {
    extractedData,
    setExtractedData,
    groupName,
    setGroupName,
    collectionType,
    setCollectionType,
    collection,
    setCollection,
    language,
    buttonTypes,
    isLoading,
  };
};
