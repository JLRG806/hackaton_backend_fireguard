import dotenv from 'dotenv';
dotenv.config();

export default {
    port: 3000,
    db: {
        // Path for save and name the database
        path: process.cwd() + '/data/db/fire_guard.db'
    },
    google: {
        // Path for save the google auth data
        auth: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    }
}