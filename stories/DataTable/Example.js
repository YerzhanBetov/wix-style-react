import React from 'react';
import DataTable from 'wix-style-react/DataTable';
import s from './Example.scss';

const style = {
  width: '50%'
};

const baseData = [
    {firstName: 'Meghan', lastName: 'Bishop'},
    {firstName: 'Sara', lastName: 'Porter'},
    {firstName: 'Deborah', lastName: 'Rhodes'},
    {firstName: 'Walter', lastName: 'Jenning'}
];

const generateData = () => {
  let data = [];
  for (let i = 0; i < 10; i++) {
    data = data.concat(baseData);
  }
  return data;
};

class DataTableExample extends React.Component {
  render() {
    return (
      <div style={style}>
        <DataTable
          dataHook="story-data-table"
          data={generateData()}
          onRowClick={(row, rowNum) => {
            /*eslint-disable no-alert*/
            window.alert(`You clicked "${row.firstName} ${row.lastName}", row number ${rowNum + 1}`);
            /*eslint-enable no-alert*/
          }}
          dynamicRowClass={row => row.firstName === baseData[1].firstName ? s.highlightRow : null}
          infiniteScroll
          itemsPerPage={20}
          columns={[
              {title: 'Row Number', render: (row, rowNum) => '#' + (rowNum + 1), width: '20%', minWidth: '75px', important: true},
              {title: 'First Name', render: row => <span>{row.firstName}</span>, width: '40%', minWidth: '100px'},
              {title: 'Last Name', render: row => <span>{row.lastName}</span>, width: '40%', minWidth: '100px'}
          ]}
          />
      </div>
    );
  }
}

export default DataTableExample;
