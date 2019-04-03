import { combineReducers } from "redux";
import { createReducer } from "redux-starter-kit";

const categories = createReducer(
  {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  {
    REQUEST_CATEGORIES: (state, action) => {
      state.didInvalidate = false;
      state.isFetching = true;
    },
    RECEIVE_CATEGORIES: (state, action) => {
      state.didInvalidate = false;
      state.isFetching = false;
      state.items = action.payload;
    }
  }
);

const postsBySubreddit = createReducer(
  {},
  {
    INVALIDATE_SUBREDDIT: (state: any, action) =>
      postsBySubredditReducer(state, action),
    RECEIVE_POSTS: (state: any, action) =>
      postsBySubredditReducer(state, action),
    REQUEST_POSTS: (state: any, action) =>
      postsBySubredditReducer(state, action)
  }
);

const postsBySubredditReducer = (state: any, action: any) => {
  const subreddit = action.payload.subreddit;
  state[subreddit] = posts(state[subreddit], action);
};

const rootReducer = combineReducers({
  categories
});

export default rootReducer;
