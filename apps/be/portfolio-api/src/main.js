/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 * __dirname is the absolute path to dist directory.
 */

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import * as path from 'path';
import router from './routers';

import https from 'https';
import { CORS_CONFIG, HTTPS_CONFIG } from '@/configs/server';
import cors from 'cors';
import connectDB from '@/middlewares/db/connectDB';

const app = express();
app.use(helmet({}));
app.use(morgan('dev'));

app.use(cors(CORS_CONFIG));
// HTTPS configs - Do not use http
const httpsServer = https.createServer(HTTPS_CONFIG, app);

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

// Port configuration
const port = process.env.PORT || 443;

// Connect to the database
app.use(connectDB);

// Routings : /personal
router(app);

// Handling errors
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        // In production, do not expose error stack
        return res.status(500).send('Internal Server Error');
    }
    console.error(err.stack);
    return res.status(500).send(err);
});

httpsServer.listen(port, () => {
    console.log(
        `Server is connected at : https://www.api.portfolio.shinsouhitoshi.local:${port}`
    );
});
httpsServer.on('error', console.error);
