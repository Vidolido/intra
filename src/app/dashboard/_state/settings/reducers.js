import { produce } from 'immer';

import {
  ADD_GROUPNAME,
  ADD_TO_COLLECTION,
  SET_COLLECTION_TYPE,
  SET_LANGUAGE,
} from './actionTypes';

export const settingsReducer = (draft, action) => {
  switch (action.type) {
    case SET_LANGUAGE: {
      return { ...draft, language: action.payload };
    }
    case ADD_GROUPNAME: {
      //   draft.groupName = draft.groupName || {};
      draft.groupName[action.payload.language] = action.payload.value;
      break;
    }
    case SET_COLLECTION_TYPE: {
      draft.collectionType = action.payload;
      break;
    }
    case ADD_TO_COLLECTION: {
      draft.collection[action.payload.collectionType].push(
        action.payload.value
      );
      break;
    }
    default:
      draft;
  }
};
