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
    axios({
      method: 'GET',
      url: '/url4',
    }).then(res => console.log(res.data));
  }

  render() {

    return (
      <section>
        TEST Section
      </section>
    );
  }
}

export default Test2;
