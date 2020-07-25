import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from 'react';
import './App.css';

import Chart, {
  ArgumentAxis,
  Series,
  Legend
} from 'devextreme-react/chart';


import Button from 'devextreme-react/button';

const data = [{
  arg: 1990,
  val: 5320816667
}, {
  arg: 2000,
  val: 6127700428
}, {
  arg: 2010,
  val: 6916183482
}];

class App extends React.Component {
  render() {
    return (
      <div class="container">

        <Chart dataSource={data}>
          <ArgumentAxis tickInterval={10} />
          <Series type="bar" />
          <Legend visible={false} />
        </Chart>

      </div>
      
    );
  }
}

export default App;
