import db from '../db/database.js'
export const AlertRepository = {}

AlertRepository.insertAlert = (sender_ip, created_at, latitude, longitude, status, isConfirmed) => {
    return new Promise((resolve, reject) => {

        try {
            db.serialize(function () {
                // Insert the new alert record
                db.run(`INSERT INTO Alert (sender_ip, created_at, latitude, longitude, status, isConfirmed) VALUES (?,?,?,?,?,?)`,
                    [sender_ip, created_at, latitude, longitude, status, isConfirmed],
                    function (err) {
                        if (err) {
                            console.error(err)

                            return reject(err)
                        }

                        return resolve(true)
                    })
            })
        } catch (error) {
            console.error(error)
            throw error
        }
    })
}

AlertRepository.fetchAlert = () => {
    return new Promise((resolve, reject) => {
        try {
            db.serialize(function () {
                // Insert the new alert record
                db.get(`SELECT * FROM Alert ORDER BY created_at DESC LIMIT 1`,
                    [],
                    function (err, row) {
                        if (err) {
                            console.error('Error in getAnamnesis:', err)
                            return reject(err)
                        }

                        // Check if a row was found
                        if (row) {
                            const record = {
                                id: row.id,
                                sender_ip: row.sender_ip,
                                created_at: row.created_at,
                                latitude: row.latitude,
                                longitude: row.longitude,
                                status: row.status,
                                isConfirmed: row.isConfirmed
                            }
                            return resolve(record)
                        } else {
                            return resolve(null) // Resolve with null when no row is found
                        }
                    })
            })
        } catch (error) {
            console.error(error)
            throw error
        }
    })
}

AlertRepository.updateAlertConfirmation = (id, status, isConfirmed) => {
    return new Promise((resolve, reject) => {
        try {
            db.serialize(function () {
                // Insert the new alert record
                db.run(`UPDATE Alert SET status = ?, isConfirmed = ? WHERE id = ?`,
                    [status, isConfirmed, id],
                    function (err) {
                        if (err) {
                            console.error('Error in getAnamnesis:', err)
                            return reject(err)
                        }

                        if (this.changes > 0) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    })
            })
        } catch (error) {
            console.error(error)
            throw error
        }
    })
}