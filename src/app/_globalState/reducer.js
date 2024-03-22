import { CHANGE_LANGUAGE } from './actionTypes';

export const globalStateReducer = (draft, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE: {
      // console.log(action, 'ACTION IN REDUCER');
      draft.language = action.payload;
      break;
    }
    default:
      return;
  }
};
