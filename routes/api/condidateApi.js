import { Router } from 'express'
import Condidate from '../../models/Condidate.js'
import mongodb from 'mongodb'
const router = Router()
router.get('/', async (req, res) => {
    try {
        const condidates = await Condidate.find()
        if (!condidates) throw new Error('no condidates')
        const sorted = condidates.sort((a, b) => {
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
        const condidate = await Condidate.findOne({ _id: o_id })
        if (!condidate) throw new Error('can not find condidate')
        res.status(200).json(condidate)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/', async (req, res) => {
    const newCondidate = new Condidate(req.body)
    try {
        const condidate = await newCondidate.save()
        if (!condidate) throw new Error('can not save new condidate')
        res.status(200).json(condidate)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const response = await Condidate.findByIdAndUpdate(id, req.body)
        if (!response) throw new Error('can not update condidate')
        const updated = { ...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Condidate.findByIdAndDelete(id)
        if (!removed) throw new Error('can not delete condidate')
        res.status(200).json(removed)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    try {
        const condidate = await Condidate.findOne(
            {
                $and: [
                    { "username": username },
                    { "password": password }
                ]
            }
        )
        if (!condidate) throw new Error('can not find condidate')
        res.status(200).json(condidate)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router