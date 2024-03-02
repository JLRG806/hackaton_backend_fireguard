import express from 'express';
import morgan from 'morgan';
import config from './config/index.js';
import AlertController from './controllers/alert.controller.js'
import ChatController from './controllers/chatbot.controller.js'
import cors from 'cors'

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PATCH,POST,DELETE',
    preflightContinue: false,
    allowedHeaders: 'Content-Type, Authorization, Content-Length, X-Requested-With',
}))

// Routes
app.use("/api", AlertController)
app.use("/api", ChatController)

// Server
app.listen(config.port, () => { console.log('Server started on http://localhost:' + config.port) })
