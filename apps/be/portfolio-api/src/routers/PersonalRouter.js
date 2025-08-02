import { Router } from 'express';
import PersonalController from '@/controllers/PersonalController';

const PersonalRouter = Router();

/* 

    domain: api.portfolio.shinsouhitoshi.local/personal/detail

*/

PersonalRouter.get('/details', PersonalController.getDetails);

export default PersonalRouter;
