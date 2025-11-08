const express = require('express')
const cors = require('cors')
const songRoutes = require('./routes/Songs.routes')

const app = express()

const defaultOrigins = [
  'http://localhost:5173',
  'https://frontend-seven-opal-23.vercel.app',
]
const configuredOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((origin) => origin.trim()).filter(Boolean)
  : []
const allowedOrigins = Array.from(new Set([...defaultOrigins, ...configuredOrigins]))

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`), false)
    },
    credentials: true,
  }),
)

app.use(express.json())

app.use('/', songRoutes)

module.exports = app