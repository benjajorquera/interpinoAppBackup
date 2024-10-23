const { Router } = require('express');

const apiRouter = require('./api.router');
const frutasRouter = require('./frutas.router');
const mailerRouter = require('./mailer.router');
const interconsultaRouter = require('./interconsultas.router');
const enqueueIC = require('./enqueue.router');
const origenRouter = require('./origen.router');
const especialidadRouter = require('./especialidad.router');
const reportsRouter = require('./reports.router');
const backupmailRouter = require('./backupmail.router');
const userRouter = require('./user.router');
const backupRouter = require('./backup.router');
const emailRouter = require('./email.router');

function routerApi(app) {
    const router = Router();
    app.use('/api', router);
    
    router.use('/', apiRouter);
    router.use('/frutas', frutasRouter);
    router.use('/mailer', mailerRouter);
    router.use('/interconsulta', interconsultaRouter);
    router.use('/enqueue', enqueueIC);
    router.use('/origen', origenRouter);
    router.use('/especialidad', especialidadRouter);
    router.use('/reports', reportsRouter);
    router.use('/backupmail', backupmailRouter);
    router.use('/user', userRouter);
    router.use('/backup', backupRouter);
    router.use('/email', emailRouter);

}

module.exports = routerApi;