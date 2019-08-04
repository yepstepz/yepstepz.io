import express from "express"
import React from 'react'
import cors from "cors"
import { renderToString } from "react-dom/server"
import App from '../shared/Pages/App'
import serialize from "serialize-javascript"
import { StaticRouter, matchPath } from "react-router-dom"
import routes from '../shared/routes'

const app = express()

app.use(cors())

// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use(express.static("public"))

app.get("http://localhost:3000/wp-json/wp/v2/posts", (req, res) => {
    const kek = require('../stub/wp-json/wp/v2/posts.json')
    if (req.query.slug) {
        console.log(req.query.slug)
        res.send(kek.find((item) => {
            console.log('item', item, item.slug)
            return item.slug == req.query.slug
        }))
    }
    res.send(kek)
})

app.get("*", (req, res, next) => {
    const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

    const promise = activeRoute.fetchInitialData
        ? activeRoute.fetchInitialData(req.path)
        : Promise.resolve()

    promise.then((data) => {
        const context = { data }
        const markup = renderToString(
            <StaticRouter location={req.url} context={{data}}>
                <App data={data} />
            </StaticRouter>
        )

        console.log('markup', req.url, markup)

        res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSR with RR</title>
          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>

        <body>
          <div id="app">${markup}</div>
        </body>
      </html>
    `)
    }).catch(() => {
        res.sendStatus(400)
    })
})

app.listen(3000, () => {
    console.log(`Server is listening on port: 3000`)
})
