import { devMode } from '@/configs/server';
import { PORT, HTTPS_CONFIG } from '@/configs/server';

// default subdomain
const SUB_NAME = 'api.portfolio';

/* DOMAIN SUB_DOMAIN are the config variables in env root and project respectively */

// Get TLD domain, i.e someone.com
const getTLDDomain = () => {
    if (devMode()) {
        return process.env.DOMAIN || 'shinsouhitoshi.local';
    } else {
        return process.env.DOMAIN || 'localhost';
    }
};

// Get subdomain, i.e: api.portfolio.someone.com
const getDomain = () => {
    if (devMode()) {
        // Use assigned dev domain
        return SUB_NAME + '.' + getTLDDomain();
    } else {
        // Use production's assigned domain
        // In case of serving prod in localhost, return localhost
        return process.env.SUB_DOMAIN || 'localhost';
    }
};
const getURL = () => {
    if (devMode()) {
        return `https://${getDomain()}:${PORT}`;
    } else {
        if (HTTPS_CONFIG) {
            return `https://${getDomain()}:${PORT}`;
        } else {
            return 'localhost';
        }
    }
};

export default getURL;
