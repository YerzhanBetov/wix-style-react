import React from 'react';
import DataTable from 'wix-style-react/DataTable';
import './Example.scss';

const style = {
  width: '50%'
};

const baseData = [
  {firstName: 'Meghan', lastName: 'Bishop'},
  {firstName: 'Sara', lastName: 'Porter'},
  {firstName: 'Deborah', lastName: 'Rhodes'},
  {firstName: 'Walter', lastName: 'Jenning'},
  {firstName: 'Amanda', lastName: 'Woods'}
];

class DataTableSortableExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sort: {}, data: baseData};
  }

  handleSortClick(colNum) {
    const desc = !this.state.sort[colNum];
    const sort = Object.assign({}, this.state.sort, {[colNum]: desc});
    const filelds = {
      1: 'firstName',
      2: 'lastName'
    };
    const sortedData = this.sortDataByField(filelds[colNum], desc);
    this.setState({sort, data: sortedData});
  }

  sortDataByField(field, desc) {
    return this.state.data.sort((a, b) => desc ? ~~(field ? a[field] < b[field] : a < b) : ~~(field ? a[field] > b[field] : a > b)); // eslint-disable-line
  }

  render() {
    return (
      <div style={style}>
        <DataTable
          dataHook="story-data-table"
          data={this.state.data}
          onSortClick={(col, colNum) => this.handleSortClick(colNum)}
          itemsPerPage={20}
          columns={[
            {title: 'Row Number', render: (row, rowNum) => '#' + (rowNum + 1), width: '20%', minWidth: '75px', important: true},
            {title: 'First Name', sortable: true, sortDescending: !!this.state.sort[1], render: row => <span>{row.firstName}</span>, width: '40%', minWidth: '100px'},
            {title: 'Last Name', sortable: true, sortDescending: !!this.state.sort[2], render: row => <span>{row.lastName}</span>, width: '40%', minWidth: '100px'}
          ]}
          />
      </div>
    );
  }
}

export default DataTableSortableExample;
