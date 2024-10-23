const express = require('express');
const app = express();
const port = 3000;
const routerApi = require('./backend/routes');
const db = require("./backend/models");


//enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});


// DB
db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })
    .catch(e => console.log("Can't syncronize", e));

// Crea email si no existe
db.email.findAll().then(data => {
    if (data.length == 0) {
        db.email.create({
            name: "Secretaria UGP",
            email: "ugp-sec.hep@redsalud.gob.cl",
            password: `${process.env.VUE_APP_UGP_SECRETARY_EMAIL_PASSWORD}`,
            host: "mail.redsalud.gob.cl",
            port: 587
        });
    }
});


// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json(({ limit: '50mb' })));
app.use(express.urlencoded({ limit: '50mb' }));


// Routes
routerApi(app);


// Starting the server
app.listen(port, () => {
    console.log('Server is running on port 3000');
}
);