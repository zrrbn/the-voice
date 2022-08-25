import { Router } from 'express'
import  Team  from '../../models/Team.js'
import mongodb from 'mongodb'

const router = Router()
router.get('/', async (req, res) => {
    try {
        const teams = await Team.find()
        if (!teams) throw new Error('no teams')
        const sorted = teams.sort((a, b) => {
            return a.teamName - b.teamName
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
        const team = await Team.findOne({ _id: o_id })
        if (!team) throw new Error('can not find team')
        res.status(200).json(team)
    } catch (err) {
        res.status(500).json({ message: err.message + "gdfdsfd"})
    }
})

router.post('/', async (req, res) => {
    const newTeam = new Team(req.body)
    try {
        const team = await newTeam.save()
        if (!team) throw new Error('can not save new team')
        res.status(200).json(team)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const response = await Team.findByIdAndUpdate(id, req.body)
        if (!response) throw new Error('can not update team')
        const updated = { ...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Team.findByIdAndDelete(id)
        if (!removed) throw new Error('can not delete team')
        res.status(200).json(removed)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router