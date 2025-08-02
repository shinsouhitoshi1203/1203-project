/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 * __dirname is the absolute path to dist directory.
 */

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import * as path from 'path';
import https from 'https';
import http from 'http';
import cors from 'cors';

import router from '@/routers';
import connectDB from '@/middlewares/db/connectDB';
import { CORS_CONFIG, HTTPS_CONFIG, PORT, devMode } from '@/configs/server';
import getURL from '@/configs/domain';

const app = express();
app.use(helmet({}));
app.use(morgan('dev'));

app.use(cors(CORS_CONFIG));

// Middleware to parse JSON and bodies
app.use(
    express.json({
        limit: '10mb', // Set a limit for JSON body size
    })
);
app.use(
    express.urlencoded({
        extended: true,
        limit: '10mb', // Set a limit for URL-encoded body size
    })
);

// Serve static files from the dist directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Connect to the database
app.use(connectDB);

// Routings : /personal
router(app);

// Handling errors
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find");
});

app.use((err, req, res, next) => {
    if (!devMode()) {
        // In production, do not expose error stack
        return res.status(500).send('Internal Server Error');
    }
    console.error(err.stack);
    return res.status(500).send(err);
});

// Get domain name
const URL = getURL();

const startServer = () => {
    if (HTTPS_CONFIG) {
        const httpsServer = https.createServer(HTTPS_CONFIG, app);
        httpsServer.listen(PORT, () => {
            console.log(`Server is connected at ${URL}`);
        });
        httpsServer.on('error', console.error);
    } else {
        const httpServer = http.createServer(app);
        httpServer.listen(PORT, () => {
            console.log(`Server is connected at ${URL}`);
        });
        httpServer.on('error', console.error);
    }
};

startServer();
