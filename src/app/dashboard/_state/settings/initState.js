import { produce } from 'immer';

export const initialState = {
  groupName: {},
  collectionType: '',
  collection: {
    single: [],
    translatedString: [],
    limit: [],
  },
};

export function addGroupName(state, item) {
  return produce(state, (draft) => {
    // draft.groupName[item.language] = item.value;
    draft.groupName = { ...draft.groupName, [item.language]: item.value };
    console.log(draft); // This will show the updated state object with the new `groupName` value
  });
}

export function editGroupName(state, item) {
  return state;
}

export function deleteGroupName(state, item) {
  return state;
}

export function setCollectionType(state, collectionType) {
  return produce(state, (draft) => {
    draft.collectionType = collectionType;
  });
}

export function addToCollection(state, collectionItem) {
  return produce(state, (draft) => {
    draft.collection.push(collectionItem);
  });
}
