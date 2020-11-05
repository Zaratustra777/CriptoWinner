/* eslint-disable */
import React, { PureComponent } from 'react';
import axios from 'axios';



class Test2 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

    this.getData();
  }

  getData = () => {

    const data1 = {
      url: '/v1/order/new',
      symbol: 'LTCUSD',
      amount: '4',
      price: '123',
      side: 'sell',
      type: 'exchange limit',
    }
  
    axios({
      method: 'POST',
      url: '/url5',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      //   user: {
      //       name: "John",
      //       email: "john@example.com"
      //   }
      // }),
      data: data1,
    }).then(res => console.log(res));

  }

  render() {

    return (
      <section>
        TEST Section3
      </section>
    );
  }
}

export default Test2;
