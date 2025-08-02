import { devMode } from '@/configs/server';

const commonSettings = {
    serverSelectionTimeoutMS: 5000,
};

const prod = {
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASSWORD,
    dbName: process.env.DATABASE_NAME,
    retryWrites: true,
    w: 'majority',
    appName: 'Group01',
};

const dev = {
    dbName: process.env.DATABASE_NAME,
};

const getConfig = () => {
    if (devMode) {
        return dev;
    } else {
        return prod;
    }
};

const config = getConfig();

// Merge with common settings for both environments
Object.assign(config, commonSettings);

export default config;
