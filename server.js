const express = require('express');
const app = express();
const axios = require('axios');
const fs = require('fs');
const moment = require('moment');

app.use(express.static('public'));

app.get('/', (req, res) => {
  fs.readFile('index.html', 'utf8', (err, data) => {
    if(err) {
      console.error(err);
      res.status(500).send('An error occurred. Please, try again later...');
    }
    res.contentType('text/html');
    res.send(data);
  });
});

app.get('/api', (req, res) => {
  axios({method: 'get', url: 'http://phisix-api3.appspot.com/stocks.json'})
    .then(result => {
      const data = {}
      data.currencies = result.data.stock.map(e => { return {name: e.name, volume: e.volume, amount: e.price.amount}});
      data.updatedAt  = moment().format('YYYY/MM/DD, h:mm:ss');
      res.json(data);
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({message: 'Unable to get data from server'});
    });
});

app.listen(3000, () =>
  console.log('Server is running')
)