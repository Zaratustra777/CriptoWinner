var express = require("express");
var axios = require('axios');
var cors = require('cors');

const request = require('request');
const crypto = require('crypto');

const apiKey = ''
const apiSecret = ''
const baseUrl = 'https://api.bitfinex.com'

const getNewOrderOptions = (newBody) => {
  const url = '/v1/order/new'
  const { symbol, amount, price, side, type } = newBody;
  const completeURL = baseUrl + url;

  const body = {
    request: '/v1/order/new',
    nonce: Date.now().toString(),
    symbol, //: 'LTCUSD',
    amount, // '2',
    price, // '1000',
    exchange: 'bitfinex',
    side, //: 'sell',
    type,
    // type: 'exchange market',
    // type: 'exchange limit',
    aff_code: "AFF_CODE_HERE" // optional param to pass an affiliate code 
  }
  
  const payload = Buffer.from(JSON.stringify(body))
      .toString('base64')
  
  const signature = crypto
    .createHmac('sha384', apiSecret)
    .update(payload)
    .digest('hex')
  
  const options = {
    url: completeURL,
    headers: {
      'X-BFX-APIKEY': apiKey,
      'X-BFX-PAYLOAD': payload,
      'X-BFX-SIGNATURE': signature
    },
    body: JSON.stringify(body)
  }

  return options;

}

getBalanceOptions = () => {
  const url = '/v1/balances'
  const nonce = Date.now().toString()
  const completeURL = baseUrl + url
  const body = {
    request: url,
    nonce
  }
  const payload = Buffer.from(JSON.stringify(body))
      .toString('base64')

  const signature = crypto
    .createHmac('sha384', apiSecret)
    .update(payload)
    .digest('hex')

  const options = {
    url: completeURL,
    headers: {
      'X-BFX-APIKEY': apiKey,
      'X-BFX-PAYLOAD': payload,
      'X-BFX-SIGNATURE': signature
    },
    body: JSON.stringify(body)
  }

  return options;
}

var app = express();
app.options('*', cors()) ;

app.get("/hist", (req, res, next) => {
  console.log('GET HIST');

  axios.get('https://api-pub.bitfinex.com/v2/trades/tBTCUSD/hist')
  .then(response => {
    res.json(response.data);
  })
  .catch(error => {
    console.log(error);
  });
 });

 app.get("/trades", (req, res, next) => {
  console.log('GET TRADES');
  console.log('req.query=', req.query);

  const { start, end } = req.query;

  const url = `https://api-pub.bitfinex.com/v2/trades/tBTCUSD/hist?start=${start}&end=${end}`;

  axios.get(url)
  .then(response => {
    res.json(response.data);
  })
  .catch(error => {
    console.log(error);
  });
 });

app.get("/bal", (req, res, next) => {
  console.log('GET BALANCE');

  const options = getBalanceOptions();

  request.post(
    options,
    function(error, response, body) {
      res.json(body);
      // console.log('response:', JSON.stringify(body, 0, 2))
    }
  );
 });
 

 app.post("/new", (req, res) => {
  console.log('NEW_ORDER_POST');

  let bodyStr = '';

        req.on('data', function (data) {
            // console.log('data=', data);
            bodyStr += data;
            // console.log('bodyStr=', bodyStr);

            if (bodyStr.length > 1e6)
                request.connection.destroy();
        });

        req.on('end', function () {
            const bodyObj = JSON.parse(bodyStr);
            console.log('bodyObj=', bodyObj);
            const options = getNewOrderOptions(bodyObj);
            console.log('getNewOrderOptions=', options);
                        
            request.post(
              options,
              function(error, response, body) {
                res.json(response);
                // res.json(body);
              }
            );

            // axios.post('http......')
            // .then(response => {
            //   res.json(response.data);
            // })
            // .catch(error => {
            //   console.log(error);
            // });
        });

 });
 
app.listen(4000, () => {
 console.log("Server running on port 4000");
});