import express from 'express';
import morgan from 'morgan';
import config from './config/index.js';
import alertController from './controllers/alert.controller.js'
import chatController from './controllers/alert.controller.js'

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use("/api", alertController)
app.use("/api", chatController)

// Server
app.listen(config.port, () => { console.log('Server started on http://localhost:' + config.port) })
