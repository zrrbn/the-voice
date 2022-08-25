import { Router } from 'express'
import Song from '../../models/Song.js'
import mongodb from 'mongodb'

const router = Router()
router.get('/', async (req, res) => {
    try {
        const songs = await Song.find()
        if (!songs) throw new Error('no songs')
        const sorted = songs.sort((a, b) => {
            return a.songName - b.songName
        })
        res.status(200).json(sorted)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        var ObjectId = ObjectId;
        var o_id = new mongodb.ObjectId(id);
        const song = await Song.findOne({ _id: o_id })
        if (!song) throw new Error('can not find song')
        res.status(200).json(song)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/', async (req, res) => {
    const newSong = new Song(req.body)
    try {
        const song = await newSong.save()
        if (!song) throw new Error('can not save new song')
        res.status(200).json(song)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        // var ObjectId = ObjectId;
        // var o_id = new mongodb.ObjectId(id);
        // const song = await Song.findOne({ _id: o_id })
        // song.score = req.body
        // console.table(song)
        const response = await Song.findByIdAndUpdate(id, req.body)
        console.log(response)
        if (!response) throw new Error('can not update song')
        const updated = { ...response._doc, ...req.body }
        console.log(updated)
        res.status(200).json(updated)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Song.findByIdAndDelete(id)
        if (!removed) throw new Error('can not delete song')
        res.status(200).json(removed)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router