import { Router } from "express"
import { AlertService } from "../services/alert.service.js"
import Joi from "joi"

const router = Router()

router.get("/alert", async (req, res) => {
    try {
        const result = await AlertService.fetchAlert()
        return res.status(200).json({ data: result })
    } catch (error) {
        console.error('Error in creating alert:', error)
        return res.status(500).json({ error: 'Internal Server Error.' })
    }
})

router.post("/alert", async (req, res) => {
    try {
        const schema = Joi.object({
            sender_ip: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
        })
        // Validate request body
        const { error } = schema.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }

        const { sender_ip, latitude, longitude } = req.body
        const created_at = Date.now()

        await AlertService.createAlert(sender_ip, latitude, longitude, created_at)

        return res.sendStatus(200)
    } catch (error) {
        console.error('Error in creating alert:', error)
        return res.status(500).json({ error: 'Internal Server Error.' })
    }
})

router.put('/alert/:id', async (req, res) => {
    try {
        const schema = Joi.object({
            confirmed: Joi.boolean().required()
        })
        // Validate request body
        const { id } = req.params
        const { error } = schema.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }

        const { confirmed } = req.body

        const result = await AlertService.updateAlert(id, confirmed)

        if (result) {
            return res.sendStatus(200)
        } else {
            return res.sendStatus(403)
        }

    } catch (error) {
        console.error('Error in creating alert:', error)
        return res.status(500).json({ error: 'Internal Server Error.' })
    }
})
export default router