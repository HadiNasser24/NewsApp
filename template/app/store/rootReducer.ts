import { combineReducers } from '@reduxjs/toolkit';

/* [TOKEN]:IMPORTS_REDUCERS - Do not remove */
import { historyReducer } from '&features/history/history.slice';
import { headlinesReducer } from '&features/headlines/headlines.slice';
import { articleReducer } from '&features/article/article.slice';
import { sourcesReducer } from '&features/sources/sources.slice';
import { landingReducer } from '&features/landing/landing.slice';

const rootReducer = combineReducers({
  /* [TOKEN]:REDUCERS - Do not remove */
  history: historyReducer,
  headlines: headlinesReducer,
  article: articleReducer,
  sources: sourcesReducer,
  landing: landingReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export { rootReducer };
