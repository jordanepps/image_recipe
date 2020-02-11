require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { NODE_ENV } = require('./config');
const errorHandler = require('./middleware/error-handler');
const fileUpload = require('express-fileupload');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.send('Image Recipe Server');
});

app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/../public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({
      fileName: file.name,
      path: `http://localhost:8000/uploads/${file.name}`
    });
  });
});

app.post('/kraken_upload', (req, res) => {
  console.log(req);
});

app.use(errorHandler);

module.exports = app;
