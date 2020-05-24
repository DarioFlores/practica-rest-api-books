const express = require('express')
const morgan = require('morgan');
const router = require('./router');

const app = express()
const port = 3000

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(morgan('dev'))

app.use(router)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))