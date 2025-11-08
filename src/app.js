const express = require('express')
const cors = require('cors')
const songRoutes = require('./routes/Songs.routes')

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173' || "https://frontend-seven-opal-23.vercel.app",
    credentials: true,
  }),
)

app.use(express.json())

app.use('/', songRoutes)

module.exports = app