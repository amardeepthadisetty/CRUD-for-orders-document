import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from 'react';
import './App.css';
import 'devextreme/data/odata/store';
import DataGrid, { Column, Pager, Paging } from 'devextreme-react/data-grid';

const dataSourceOptions = {
  store: {
    type: 'odata',
    url: 'http://localhost:5000/api/orders'
  }
};

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <DataGrid
          dataSource={dataSourceOptions}
          showBorders={true}
        >
          <Paging defaultPageSize={10} />
          <Pager
            showPageSizeSelector={true}
            allowedPageSizes={[5, 10, 20]}
            showInfo={true} />

          <Column
            dataField="_id"
            width={250}
          />
          <Column
            dataField="product_name"
            width={250}
          />
          <Column
            dataField="price"
            caption="Cost"
            dataType="number"
            format="currency"
          />
          <Column dataField="purchase_date" />
          <Column dataField="customer" />


          
          <Column
            dataField="qty"
            caption="Quantity"
            dataType="number"
          />
        </DataGrid>

      </div>
      );
  }
}

export default App;