import moment from 'moment';

// News
export const NEWS_FETCH = 'NEWS_FETCH';
export const NEWS_FETCHED = 'NEWS_FETCHED';

export function newsFetched(json) {
  return {
    type: NEWS_FETCHED,
    items: json.feed.entries.map(entry => entry.title),
  };
}

export function newsFetch() {
  return (dispatch) => {
    dispatch({type: NEWS_FETCH});
    fetch('/_api/news')
      .then(res => res.json())
      .then(json => dispatch(newsFetched(json)))
  };
}

// BART
export const BART_FETCH = 'BART_FETCH';
export const BART_FETCHED = 'BART_FETCHED';

export function bartFetched(json) {
  // Parse a string like "04/30/2016 10:25:33 PM PDT".
  const etdBase = moment(json.etd.root.date[0]+' '+json.etd.root.time[0], 'MM/DD/YYY hh:mm:ss a');
  let etd = [];
  if(json.etd.root.station[0].etd) {
    json.etd.root.station[0].etd.forEach(dest => {
      dest.estimate.forEach(est => {
        etd.push(etdBase.clone().add(parseInt(est.minutes[0], 10), 'minutes').toString())
      })
    })
  }
  etd.sort();
  return {
    type: BART_FETCHED,
    etd: etd,
    advisory: json.bsa.root.bsa[0].description[0],
    escalators: json.ets.escalators.escalator,
  };
}

export function bartFetch() {
  return (dispatch) => {
    dispatch({type: BART_FETCH});
    fetch('/_api/bart')
      .then(res => res.json())
      .then(json => dispatch(bartFetched(json)))
  };
}

// Weather
export const WEATHER_FETCH = 'WEATHER_FETCH';
export const WEATHER_FETCHED = 'WEATHER_FETCHED';

export function weatherFetched(location, json) {
  return {
    type: WEATHER_FETCHED,
    location: location,
    temperature: json.currently.apparentTemperature,
    humidity: json.currently.humidity,
    high: json.daily.data[0].apparentTemperatureMax,
    low: json.daily.data[0].apparentTemperatureMin,
    icon: json.daily.data[0].icon,
  };
}

export function weatherFetch(location) {
  return (dispatch) => {
    dispatch({type: WEATHER_FETCH, location: location});
    fetch('/_api/weather/'+location)
      .then(res => res.json())
      .then(json => dispatch(weatherFetched(location, json)))
  };
}
