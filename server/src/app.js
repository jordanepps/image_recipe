require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { NODE_ENV, KRAKEN_KEY, KRAKEN_SECRET } = require('./config');
const errorHandler = require('./middleware/error-handler');
const fileUpload = require('express-fileupload');

//Kraken Image Processor
const Kraken = require('kraken');
const kraken = new Kraken({
  api_key: KRAKEN_KEY,
  api_secret: KRAKEN_SECRET
});

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());
app.use(fileUpload());

app.get('/', (req, res) => {
  res.send('Image Recipe Server');
});

app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  console.log(file);

  file.mv(`${__dirname}/../public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.use(errorHandler);

module.exports = app;
