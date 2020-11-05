import axios from 'axios';

export const getLog = () => {

  const data1 = {
    symbol: 'LTCUSD',
    amount: '3',
    price: '123',
    exchange: 'bitfinex',
    side: 'sell',
    type: 'exchange market',
  }

  axios({
    method: 'POST',
    url: '/url5',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data1,
  }).then(res => console.log(res));

};
