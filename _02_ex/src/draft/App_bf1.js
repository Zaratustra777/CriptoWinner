import React, { Component } from 'react';
import { Tabs, Tab, Paper, TextField, Button } from '@material-ui/core';
import './App.css';
class App extends Component {
  state = {
    tabValue: 0,
    response: '',
  };
  componentDidMount() {

  }

  handleChangeTabs = (e, tabValue) => {
    this.setState({ tabValue });
  };

render() {
  const { tabValue } = this.state;

    return (
      <div>
         <div className="mainTrade">
           <div style={{ width: '75%', margin: '0 36px 0 0' }}>
              <Tabs
                value={tabValue}
                indicatorColor="primary"
                textColor="primary"
                onChange={this.handleChangeTabs}
                // style={{ paddingTop: '16px' }}
              >
                <Tab label="Settings" />
                <Tab label="Trade" />
                <Tab label="Bot" />
              </Tabs>

              <section>
                {tabValue === 0 && (
                  <Paper className="paperStyle">
                    <h1>Settings page</h1>
                    <div>

                      <div>
                        <TextField label="Key" variant="outlined" style={{ margin: '8px'}} />
                      </div>

                      <div>
                        <TextField label="Secret" variant="outlined" style={{ margin: '8px'}} />
                      </div>

                      <div>
                        <TextField label="Number of orders" variant="outlined" style={{ margin: '8px'}} />
                      </div>

                    </div>
                  </Paper>
                )}
                {tabValue === 1 && (
                  <Paper className="paperStyle">
                    <h1>Trade page</h1>
                    <div>
                      <TextField label="Pair" style={{ margin: '8px'}}/>
                      <TextField label="Price" variant="filled" style={{ margin: '8px'}}/>
                      <TextField label="Amount" variant="outlined" style={{ margin: '8px'}}/>
                      <Button color="primary" variant="contained" size="large">Sell</Button>
                    </div>

                    <div>
                      <TextField label="Pair" style={{ margin: '8px'}}/>
                      <TextField label="Price" variant="filled" style={{ margin: '8px'}}/>
                      <TextField label="Amount" variant="outlined" style={{ margin: '8px'}}/>
                      <Button color="primary" variant="contained" size="large">Buy</Button>
                    </div>
                  </Paper>
                )}
                {tabValue === 2 && (
                  <Paper>
                    Bot page
                  </Paper>
                )}
              </section>

           </div>


            <div style={{ width: '25%'}}>
              <Paper>
                <h2>BALANCE</h2>
                <div>{'BTC : 0.01'}</div>
                <div>{'LTC : 0.11'}</div>
              </Paper>
              </div>
         </div>



      

      </div>
    );
  }
}
export default App;