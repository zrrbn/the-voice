import { Router } from 'express'
import Admin from '../../models/Admin.js'

const router = Router()
router.get('/', async (req, res) => {
    try {
        const admins = await Admin.find()
        if (!admins) throw new Error('no admins')
        const sorted = admins.sort((a, b) => {
            return a.username - b.username
        })
        res.status(200).json(sorted)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

})

router.post('/', async (req, res) => {
    const newAdmin = new Admin(req.body)
    try {
        const admin = await newAdmin.save()
        if (!admin) throw new Error('can not save new admin')
        res.status(200).json(admin)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const response = await Admin.findByIdAndUpdate(id, req.body)
        if (!response) throw new Error('can not update admin')
        const updated = { ...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Admin.findByIdAndDelete(id)
        if (!removed) throw new Error('can not delete admin')
        res.status(200).json(removed)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    try {
        const admin = await Admin.findOne(
            {
                $and: [
                    { "username": username },
                    { "password": password }
                ]
            }
        )
        if (!admin) throw new Error('can not find admin')
        res.status(200).json(admin)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router