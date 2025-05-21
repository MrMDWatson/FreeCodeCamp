require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dns = require('dns');

mongoose.connect(
  process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const shortUrlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  short_url: Number
});

let ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.use('/api/shorturl', async (req, res, next) => {
  const urlList = await ShortUrl.find({});
  req.nextNum = urlList.length + 1;
  next();
});

app.post('/api/shorturl', async (req, res) => {
  const { url } = req.body;
  const validUrl = /^(http|https):\/\//i.test(url);
  try {
    if (validUrl) {
      const newUrl = await ShortUrl.create({url: url, short_url: req.nextNum});
      console.log("Post success...");
      res.json({original_url: url, short_url: req.nextNum});
    } else {
      res.json({error: 'invalid url'});
    }
  } catch(err) {
    console.log(err);
  }
});

app.get('/api/shorturl/:number', async (req, res) => {
  try {
    const link = await ShortUrl.findOne({short_url: req.params.number});
    console.log("Get success...");
    res.redirect(link.url);
  } catch(err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
