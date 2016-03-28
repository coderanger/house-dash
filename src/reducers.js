import { combineReducers } from 'redux';
import * as actions from './actions';

function news(state = {isFetching: false, items: []}, action) {
  switch(action.type) {
    case actions.NEWS_FETCH:
      return Object.assign({}, state, {
        isFetching: true,
        items: [],
      })
    case actions.NEWS_FETCHED:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
      })
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  news,
})

export default rootReducer
