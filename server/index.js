import express from 'express'
import bodyParser from 'body-parser'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'

import App from './../app/views/components/App'

const app = express()
// Enable public assets
app.use(express.static('dist/'))
// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}));

const server = require('http').Server(app)

app.get('/', (req, res) => {
  const context = {}

  const html = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App />
    </StaticRouter>,
  )

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    })
    res.end()
  } else {
    res.write(`
      <!doctype html>
      <div id="app">${html}</div>
    `)
    res.end()
  }
})

server.listen(3000)
