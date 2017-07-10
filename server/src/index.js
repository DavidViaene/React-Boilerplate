import express from 'express'
import bodyParser from 'body-parser'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'

import Root from './../../app/views/containers/Root'
import configureStore from './../../app/state/store'

const app = express()
// Enable public assets
app.use(express.static('dist/'))
// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}));

const server = require('http').Server(app)


const store = configureStore({})

app.get('/', (req, res) => {
  const context = {}

  const html = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <Root store={store} />
    </StaticRouter>,
  )

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    })
    res.end()
  } else {
    res.write(`
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>React App Setup</title>
      </head>
      <body>
          <div id="root">
            ${html}
          </div>
      </body>
      </html>
    `)
    res.end()
  }
})

server.listen(3000)
