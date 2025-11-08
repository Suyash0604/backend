const express = require('express')
const multer = require('multer')

const Song = require('../models/Song.model')
const uploadFile = require('../Services/Storage.service')

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post('/create', upload.single('audio'), async (req, res) => {
  try {
    const { title, artist, mood } = req.body

    if (!title || !artist || !mood) {
      return res.status(400).json({ message: 'Title, artist, and mood are required' })
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Audio file is required' })
    }

    const uploaded = await uploadFile(req.file)

    const song = await Song.create({
      title,
      artist,
      audioUrl: uploaded.url,
      mood,
    })

    res.status(201).json(song)
  } catch (error) {
    console.error('Error uploading song:', error)
    res.status(500).json({ message: 'Failed to upload song' })
  }
})

router.get('/songs', async (req, res) => {
  try {
    const mood = req.query.mood
    const filter = mood ? { mood: mood.toLowerCase() } : {}
    const songs = await Song.find(filter).sort({ createdAt: -1 })
    res.status(200).json(songs)
  } catch (error) {
    console.error('Error fetching songs:', error)
    res.status(500).json({ message: 'Failed to fetch songs' })
  }
})

module.exports = router