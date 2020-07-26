import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from 'react';
import './App.css';

import { DataGrid, Column, Editing, Scrolling, Lookup, Summary, TotalItem, Pager, Paging} from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button';
import { SelectBox } from 'devextreme-react/select-box';

import CustomStore from 'devextreme/data/custom_store';
import { formatDate } from 'devextreme/localization';
import 'whatwg-fetch';

const URL = 'http://localhost:5000/api/orders';

const REFRESH_MODES = ['full', 'reshape', 'repaint'];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ordersData: new CustomStore({
        key: '_id',
        load: () => this.sendRequest(`${URL}`),
        insert: (values) => this.sendRequest(`${URL}`, 'POST', {
          values: JSON.stringify(values)
        }),
        update: (key, values) => this.sendRequest(`${URL}`, 'PUT', {
          key: key,
          values: JSON.stringify(values)
        }),
        remove: (key) => this.sendRequest(`${URL}`, 'DELETE', {
          key: key
        })
      }),
      requests: [],
      refreshMode: 'reshape'
    };

    this.clearRequests = this.clearRequests.bind(this);
    this.handleRefreshModeChange = this.handleRefreshModeChange.bind(this);
  }

  sendRequest(url, method, data) {
    method = method || 'GET';
    data = data || {};

    this.logRequest(method, url, data);

    if (method === 'GET') {
      return fetch(url, {
        method: method,
        credentials: 'include'
      }).then(result => result.json().then(json => {
        if (result.ok) return json.data;
        throw json.Message;
      }));
    }

    const params = Object.keys(data).map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
    }).join('&');

    return fetch(url, {
      method: method,
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      credentials: 'include'
    }).then(result => {
      if (result.ok) {
        return result.text().then(text => text && JSON.parse(text));
      } else {
        return result.json().then(json => {
          throw json.Message;
        });
      }
    });
  }

  logRequest(method, url, data) {
    const args = Object.keys(data || {}).map(function (key) {
      return `${key}=${data[key]}`;
    }).join(' ');

    const time = formatDate(new Date(), 'HH:mm:ss');
    const request = [time, method, url.slice(URL.length), args].join(' ');

    this.setState((state) => {
      return { requests: [request].concat(state.requests) };
    });
  }

  clearRequests() {
    this.setState({ requests: [] });
  }

  handleRefreshModeChange(e) {
    this.setState({ refreshMode: e.value });
  }

  render() {
    const { refreshMode, ordersData, customersData, shippersData } = this.state;
    return (
      <div className="container">
        <DataGrid
          id="grid"
          showBorders={true}
          dataSource={ordersData}
          repaintChangesOnly={true}
        >
          <Paging defaultPageSize={5} />
          <Pager
            showPageSizeSelector={true}
            allowedPageSizes={[5, 10, 20]}
            showInfo={true} />

          <Editing
            refreshMode={refreshMode}
            mode="cell"
            allowAdding={true}
            allowDeleting={true}
            allowUpdating={true}
          />

         {/*  <Scrolling
            mode="virtual"
          /> */}

          <Column dataField="_id" caption="Product ID" allowEditing={false}  >
            
          </Column>

          <Column dataField="product_name" caption="Product Name">

          </Column>

          <Column dataField="price" caption="Price">

          </Column>

          <Column dataField="purchase_date" dataType="date">
          </Column>

          <Column dataField="customer">
          </Column>

          <Column dataField="qty" caption="Quantity">
          </Column>

          
        </DataGrid>
        
      </div>
    );
  }
}

export default App;