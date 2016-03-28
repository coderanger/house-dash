import 'babel-polyfill';
import 'isomorphic-fetch';
import Express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const app = new Express();

import webpackConfig from './webpack.config';
const webpackCompiler = webpack(webpackConfig);
app.use(webpackMiddleware(webpackCompiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));
app.use(webpackHotMiddleware(webpackCompiler));

app.get('/', (req, res) => {
  res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Document</title></head><body><div id="root"></div><script src="/assets/app.js"></script></body></html>');
});

import { parseURL } from 'rss-parser';
app.get('/_api/news', (req, res) => {
  parseURL('http://feeds.bbci.co.uk/news/rss.xml?edition=uk', (err, parsed) => {
    if(err)
      res.status(500).send(err.toString())
    else
      res.send(parsed)
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
