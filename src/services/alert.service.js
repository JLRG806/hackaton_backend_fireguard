//import { v4 as uuidv4 } from 'uuid'

import { AlertRepository } from "../repository/alert.repository.js"

export const AlertService = {}

AlertService.createAlert = async (sender_ip, latitude, longitude, created_at) => {
    try {
        const status = 1
        const isConfirmed = 0
        const result = await AlertRepository.insertAlert(sender_ip, created_at, latitude, longitude, status, isConfirmed)
        return result
    } catch (error) {
        console.error('Error in createAlert:', error)
        throw error // Throw the error for the caller to handle
    }
}

AlertService.fetchAlert = async () => {
    try {
        const status = 1
        const isConfirmed = 0
        const result = await AlertRepository.fetchAlert()
        return result
    } catch (error) {
        console.error('Error in createAlert:', error)
        throw error // Throw the error for the caller to handle
    }

}

AlertService.updateAlert = async (id, confirm) => {
    try {
        let result;
        if (confirm) {
            result = await AlertRepository.updateAlertConfirmation(id, 1, 1)
        } else {
            result = await AlertRepository.updateAlertConfirmation(id, 0, 0)
        }

        return result
    } catch (error) {
        console.error('Error in createAlert:', error)
        throw error // Throw the error for the caller to handle
    }
}