import PersonalRouter from '@/routers/PersonalRouter';

function router(app) {
    // Define your routes

    app.use('/personal', PersonalRouter);
}

export default router;
