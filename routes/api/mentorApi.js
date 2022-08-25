import { Router } from 'express'
import  Mentor  from '../../models/Mentor.js'
import mongodb from 'mongodb'

const router = Router()
router.get('/', async (req, res) => {
    try {
        const mentors = await Mentor.find()
        if (!mentors) throw new Error('no mentors')
        const sorted = mentors.sort((a, b) => {
            return a.username - b.username
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
        const mentor = await Mentor.findOne({ _id: o_id })
        if (!mentor) throw new Error('can not find mentor')
        res.status(200).json(mentor)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/', async (req, res) => {
    const newMentor = new Mentor(req.body)
    try {
        const mentor = await newMentor.save()
        if (!mentor) throw new Error('can not save new mentor')
        res.status(200).json(mentor)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const response = await Mentor.findByIdAndUpdate(id, req.body)
        if (!response) throw new Error('can not update mentor')
        const updated = { ...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Mentor.findByIdAndDelete(id)
        if (!removed) throw new Error('can not delete mentor')
        res.status(200).json(removed)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    try {
        const mentor = await Mentor.findOne(
            {
                $and: [
                    { "username": username },
                    { "password": password }
                ]
            }
        )
        if (!mentor) throw new Error('can not find mentor')
        res.status(200).json(mentor)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


export default router