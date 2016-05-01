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

function bart(state = {isFetching: true, etd: [], advisory: null, escalators: []}, action) {
  switch(action.type) {
    case actions.BART_FETCH:
      return Object.assign({}, state, {
        isFetching: true,
        etd: [],
        advisory: null,
        escalators: []
      })
    case actions.BART_FETCHED:
      return Object.assign({}, state, {
        isFetching: false,
        etd: action.etd,
        advisory: action.advisory,
        escalators: action.escalators,
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
          temperature: null,
          humidity: null,
          high: null,
          low: null,
          icon: null,
        })
      case actions.WEATHER_FETCHED:
        if(location != action.location) return state;
        return Object.assign({}, state, {
          isFetching: false,
          temperature: action.temperature,
          humidity: action.humidity,
          high: action.high,
          low: action.low,
          icon: action.icon,
        })
      default:
        return state;
    }
  };
}

const weather = combineReducers({sf: weatherInternal('sf'), home: weatherInternal('home')});

function gif(state = {isFetching: true, images: []}, action) {
  switch(action.type) {
    case actions.GIF_FETCH:
      return Object.assign({}, state, {
        isFetching: true,
        images: [],
      })
    case actions.GIF_FETCHED:
      return Object.assign({}, state, {
        isFetching: false,
        images: action.images,
      })
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  news,
  bart,
  weather,
  gif,
})

export default rootReducer
