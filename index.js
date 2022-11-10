const express = require('express');
require("dotenv").config();

const router = require('./src/routes')
// const cors = require("cors");


const http = require("http");
const app = express();
const port = 6500;

const server = http.createServer(app);

app.use(express.json());
app.use('/api/v1/', router)

app.listen(port, () => console.log(`Listening On Port ${port}!`));
