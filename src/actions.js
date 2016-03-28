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

