import { combineReducers } from '@reduxjs/toolkit';

/* [TOKEN]:IMPORTS_REDUCERS - Do not remove */
import { reduxReducer } from '&features/redux/redux.slice';
import { landingReducer } from '&features/landing/landing.slice';
import { localStorageReducer } from '&features/localStorage/localStorage.slice';
import { formReducer } from '&features/forms/forms.slice';
import { apiReducer } from '&features/api/api.slice';

const rootReducer = combineReducers({
  /* [TOKEN]:REDUCERS - Do not remove */
  redux: reduxReducer,
  landing: landingReducer,
  localStorage: localStorageReducer,
  form: formReducer,
  api: apiReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export { rootReducer };
