import { connect } from 'mongoose';

import config from '@/middlewares/db/config';

// connectDB: connects to the database before starting the server
const defaultDatabaseUrl = 'mongodb://localhost:27017/shinsouhitoshi1203'; // Default database URL

let connected = false;

async function connectDB(req, res, next) {
    try {
        const addr = process.env.DATABASE_URL || defaultDatabaseUrl;
        if (connected) {
            return next();
        }
        await connect(addr, config);
        connected = true;
        console.log('Server is connected to the database at', addr);
        return next();
    } catch (error) {
        // Handle connection errors: if its in production, send a generic error message!
        if (process.env.NODE_ENV === 'production') {
            return res.status(500).send('Database connection not established');
        } else {
            return next(error);
        }
    }
}

export default connectDB;
