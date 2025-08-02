import { readFileSync } from 'fs';
import { join } from 'path';

// Configuration for servers.

const CERT_DIR = process.env.CERT_DIR || 'S:/webserver/cert/shinsouhitoshi1203';

const HTTPS_CONFIG =
    process.env.NODE_ENV === 'development'
        ? {
              key: readFileSync(join(CERT_DIR, 'shinsouhitoshi.local.key')),
              cert: readFileSync(join(CERT_DIR, 'shinsouhitoshi.local.crt')),
          }
        : {};

// CORS configuration
const CORS_CONFIG =
    process.env.NODE_ENV === 'production'
        ? {
              origin: '*',
              credential: true,
          }
        : {
              origin: [/\.*shinsouhitoshi\.local$/],
              credential: true,
          };

export { HTTPS_CONFIG, CORS_CONFIG };
