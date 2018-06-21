require('babel-register');
require('babel-polyfill');

global.document = require('jsdom').jsdom('<body><div id="app"></div></body>');
global.window = document.defaultView;
global.navigator = window.navigator;

global.$ = require('jquery');
global.Handlebars = require('handlebars');
global._ = require('lodash');
global.Backbone = require('backbone');