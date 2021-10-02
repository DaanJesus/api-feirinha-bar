require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');
const app = express();

const SERVER_PORT = Number(process.env.SERVER_PORT || 8080)
let host = `localhost:${SERVER_PORT}`;

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

mongoose.connect(process.env.MONGO_URL_PRD, {
    useNewUrlParser: true,
    useUnifiedTopology: true/* ,
    useFindAndModify: false,
    useCreateIndex: true, */
}).then(
    () => {
        console.log("Success connect to: DataBase", host);
    },
    err => {
        console.log("Error connect to: Database" + err);
    }
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(morgan("dev"));

app.use(express.json());

app.get('/', async(req, res) => {
    res.redirect('/api-docs')
})

require('./app/controller/index')(app);

app.listen(process.env.PORT || 8080);