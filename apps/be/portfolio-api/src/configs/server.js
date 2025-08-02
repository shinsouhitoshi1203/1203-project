import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

// Configuration for servers.

/* 

    Deployment in local environment
    - Use self-signed certificates for HTTPS
    - CORS is set to allow requests from local domains

*/

/* 

    Deployment in production environment
    - Use valid SSL certificates
    - CORS is set to allow requests from all origins
    - Do not use HTTP, only HTTPS. The hosting server should handle HTTP to HTTPS redirection.

*/
const devMode = () => process.env.NODE_ENV === 'development';
const getCertDir = () => {
    if (devMode()) {
        return process.env.CERT_DIR || 'S:/webserver/cert/shinsouhitoshi1203';
    } else {
        return process.env.CERT_DIR || '';
    }
};

const CERT_DIR = getCertDir();

console.log(process.env.NODE_ENV);

// development uses local certificates, production uses its own certificate given by vercel or heroku
const getHTTPSConfig = () => {
    const configRaw = (keyPath, certPath) => {
        if (existsSync(keyPath) && existsSync(certPath)) {
            return {
                key: readFileSync(keyPath),
                cert: readFileSync(certPath),
            };
        }
        return null;
    };

    if (devMode()) {
        const keyPath = join(CERT_DIR, 'shinsouhitoshi.local.key');
        const certPath = join(CERT_DIR, 'shinsouhitoshi.local.crt');
        return configRaw(keyPath, certPath);
    } else {
        const KEY_NAME = process.env.KEY_NAME;
        const CERT_NAME = process.env.CERT_NAME;
        if (!KEY_NAME || !CERT_NAME) {
            console.warn("SSL hasn't created yet, switched to port 80");
            return null;
        }
        const keyPath = join(CERT_DIR, KEY_NAME);
        const certPath = join(CERT_DIR, CERT_NAME);
        return configRaw(keyPath, certPath);
    }
};

const getCorsConfig = () => {
    const configRaw = {
        credentials: true,
    };
    if (devMode()) {
        configRaw.origin = [/.*\.shinsouhitoshi\.local$/];
    } else {
        configRaw.origin = '*';
    }

    return configRaw;
};

// HTTPS configuration based on the environment
const HTTPS_CONFIG = getHTTPSConfig();

// CORS configuration
const CORS_CONFIG = getCorsConfig();

// PORT configuration. Everything is done in localhost to makesure 443 works
const getPort = () => {
    if (HTTPS_CONFIG) {
        return 443;
    } else {
        return 80;
    }
};

const PORT = getPort();

export { HTTPS_CONFIG, CORS_CONFIG, PORT, devMode };
