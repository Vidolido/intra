import {
  ADD_GROUPNAME,
  ADD_TO_COLLECTION,
  DELETE_FROM_COLLECTION,
  EDIT_COLLECTION_ITEM,
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
        action.payload.data
        // action.payload.value
      );
      break;
    }
    case EDIT_COLLECTION_ITEM: {
      console.log(action.payload);
      // draft.collection[draft.collectionType]
      break;
    }
    case DELETE_FROM_COLLECTION: {
      draft.collection[draft.collectionType].splice(
        draft.collection[draft.collectionType].findIndex(
          (item) => item.id === action.payload
        ),
        1
      );
      break;
    }
    default:
      // draft;
      return;
  }
};
