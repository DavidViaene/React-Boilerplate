'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _reactRouter = require('react-router');

var _App = require('./../app/views/components/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
// Enable public assets
app.use(_express2.default.static('dist/'));
// Parse incoming request bodies in a middleware before your handlers
app.use(_bodyParser2.default.json());
// app.use(bodyParser.urlencoded({extended: true}));

var server = require('http').Server(app);

app.get('/', function (req, res) {
  var context = {};

  var html = _server2.default.renderToString(_react2.default.createElement(
    _reactRouter.StaticRouter,
    {
      location: req.url,
      context: context
    },
    _react2.default.createElement(_App2.default, null)
  ));

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end();
  } else {
    res.write('\n      <!doctype html>\n      <div id="app">' + html + '</div>\n    ');
    res.end();
  }
});

server.listen(3000);