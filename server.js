import 'babel-polyfill';
import 'isomorphic-fetch';
import Express from 'express';

const isProd = process.env.NODE_ENV == 'production';
const app = new Express();

if(isProd) {
  console.log('Starting in production mode');
  app.use('/assets', Express.static('dist'));
} else {
  console.log('Starting in development mode');
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('./webpack.config');

  const webpackCompiler = webpack(webpackConfig);
  app.use(webpackMiddleware(webpackCompiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(webpackCompiler));
}

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Document</title>${isProd ? '<link rel="stylesheet" href="/assets/app.css"></link>' : ''}</head><body><div id="root"></div><script src="/assets/app.js"></script></body></html>`);
});

import rssParser from 'rss-parser';
app.get('/_api/news', (req, res) => {
  rssParser.parseURL('https://feeds.bbci.co.uk/news/rss.xml?edition=us', (err, parsed) => {
    if(err)
      res.status(500).send(err.toString())
    else
      res.send(parsed)
  });
});

import xml2js from 'xml2js';
app.get('/_api/bart', (req, res) => {
  function bartApiCall(url) {
    return fetch(url).then(r => r.text()).then(text => new Promise((resolve, reject) => {
      let parser = new xml2js.Parser();
      parser.parseString(text, (err, result) => {
        if(err)
          reject(err)
        else
          resolve(result)
      });
    }));
  }
  let calls = [
    bartApiCall('http://api.bart.gov/api/etd.aspx?cmd=etd&orig=LAFY&dir=s&key='+process.env.BART_API_KEY),
    bartApiCall('http://api.bart.gov/api/bsa.aspx?cmd=bsa&key='+process.env.BART_API_KEY),
    fetch('http://www.bart.gov/bart/api/ets/status').then(r => r.json()),
  ];
  Promise.all(calls)
    .then(([etd, bsa, ets]) => res.send({etd: etd, bsa: bsa, ets: ets}))
    .catch(err => res.status(500).send(err.toString()));
});

app.get('/_api/weather/home', (req, res) => {
  fetch(`https://api.forecast.io/forecast/${process.env.FORECASTIO_API_KEY}/37.8922381722366,-122.12288780183`)
    .then(r => r.json())
    .then(json => res.send(json))
    .catch(err => res.status(500).send(err.toString()));
});

app.get('/_api/weather/sf', (req, res) => {
  fetch(`https://api.forecast.io/forecast/${process.env.FORECASTIO_API_KEY}/37.7868693336672,-122.399941811198`)
    .then(r => r.json())
    .then(json => res.send(json))
    .catch(err => res.status(500).send(err.toString()));
});

app.get('/_api/gif', (req, res) => {
  let imgurFetch = (url) => fetch(`https://api.imgur.com/3${url}`, {headers: {Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`}});
  let fetchFavs = (page) => imgurFetch(`/account/coderanger/gallery_favorites/${page}`)
    .then(r => r.json())
    .then(json => Promise.all(json.data.map(fav => {
      if(fav.is_album) {
        return imgurFetch(`/gallery/album/${fav.id}`)
          .then(r => r.json())
          .then(json => json.data.images)
          .catch([]); // Ignore errors on the album fetches.
      } else {
        return [fav];
      }
    })))
    .then(images => Array.prototype.concat.call(...images))

  Promise.all([fetchFavs(0), fetchFavs(1), fetchFavs(2), fetchFavs(3), fetchFavs(4), fetchFavs(5)])
    .then(images => res.send({images: Array.prototype.concat.call(...images)}))
    .catch(err => res.status(500).send(err.toString()));
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
