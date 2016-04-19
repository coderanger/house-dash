import { combineReducers } from 'redux';
import * as actions from './actions';

function news(state = {isFetching: true, items: []}, action) {
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

function bart(state = {isFetching: true, etd: []}, action) {
  switch(action.type) {
    case actions.BART_FETCH:
      return Object.assign({}, state, {
        isFetching: true,
        etd: [],
      })
    case actions.BART_FETCHED:
      return Object.assign({}, state, {
        isFetching: false,
        etd: action.etd,
      })
    default:
      return state;
  }
}

function weatherInternal(location) {
  return (state = {isFetching: true}, action) => {
    switch(action.type) {
      case actions.WEATHER_FETCH:
        if(location != action.location) return state;
        return Object.assign({}, state, {
          isFetching: true,
          // etd: [],
        })
      case actions.WEATHER_FETCHED:
        if(location != action.location) return state;
        return Object.assign({}, state, {
          isFetching: false,
          // etd: action.etd,
        })
      default:
        return state;
    }
  };
}

const weather = combineReducers({sf: weatherInternal('sf'), home: weatherInternal('home')});

const rootReducer = combineReducers({
  news,
  bart,
  weather,
})

export default rootReducer
