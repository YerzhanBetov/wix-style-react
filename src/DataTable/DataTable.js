import React, {Component} from 'react';
import PropTypes from 'prop-types';
import s from './DataTable.scss';
import classNames from 'classnames';
import InfiniteScroll from './InfiniteScroll';
import WixComponent from '../BaseComponents/WixComponent';
import ArrowVertical from '../Icons/dist/components/ArrowVertical';
import {Animator} from 'wix-animations';

export const DataTableHeader = props => (
  <div>
    <table style={{width: props.width}} className={s.table}>
      <TableHeader {...props}/>
    </table>
  </div>
);

DataTableHeader.propTypes = {
  width: PropTypes.number
};

class DataTable extends WixComponent {
  constructor(props) {
    super(props);
    let state = {selectedRows: {}};
    if (props.infiniteScroll) {
      state = {...state, ...this.createInitialScrollingState(props)};
    }
    this.state = state;
  }

  componentWillReceiveProps(nextProps) {
    let isLoadingMore = false;
    if (this.props.infiniteScroll && nextProps.data !== this.props.data) {
      if (nextProps.data instanceof Array && this.props.data instanceof Array) {
        if (this.props.data.every((elem, index) => {
          return nextProps.data.length > index && nextProps.data[index] === elem;
        })) {
          isLoadingMore = true;
          this.setState({lastPage: this.calcLastPage(nextProps)});
        }
      }
      if (!isLoadingMore) {
        this.setState(this.createInitialScrollingState(nextProps));
      }
    }
  }

  createInitialScrollingState(props) {
    return {currentPage: 0, lastPage: this.calcLastPage(props)};
  }

  render() {
    const {data, showHeaderWhenEmpty, infiniteScroll, itemsPerPage} = this.props;

    if (!data.length && !showHeaderWhenEmpty) {
      return null;
    }

    const rowsToRender = infiniteScroll ?
      data.slice(0, ((this.state.currentPage + 1) * itemsPerPage)) :
      data;

    const table = this.renderTable(rowsToRender);

    if (infiniteScroll) {
      return this.wrapWithInfiniteScroll(table);
    }

    return table;
  }

  wrapWithInfiniteScroll = table => {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadMore}
        hasMore={this.state.currentPage < this.state.lastPage || (this.props.hasMore)}
        loader={this.props.loader}
        useWindow={this.props.useWindow}
        scrollElement={this.props.scrollElement}
        >
        {table}
      </InfiniteScroll>
    );
  };

  renderTable = rowsToRender => {
    const style = {width: this.props.width};
    return (
      <div>
        <table id={this.props.id} style={style} className={s.table}>
          {!this.props.hideHeader &&
          <TableHeader {...this.props}/>}
          {this.renderBody(rowsToRender)}
        </table>
      </div>);
  };

  renderBody = rows => (
    <tbody>
      {rows.map(this.renderRow)}
    </tbody>
  );

  onRowClick = (rowData, rowNum) => {
    const {onRowClick, rowDetails} = this.props;
    onRowClick && onRowClick(rowData, rowNum);
    rowDetails && this.toggleRowDetails(rowNum);
  }

  renderRow = (rowData, rowNum) => {
    const {onRowClick, onMouseEnterRow, onMouseLeaveRow, rowDataHook, dynamicRowClass, rowDetails} = this.props;
    const rowClasses = [this.props.rowClass];
    const optionalRowProps = {};

    const handlers = [
      {rowEventHandler: this.onRowClick, eventHandler: 'onClick'},
      {rowEventHandler: onMouseEnterRow, eventHandler: 'onMouseEnter'},
      {rowEventHandler: onMouseLeaveRow, eventHandler: 'onMouseLeave'}
    ];

    handlers.forEach(({rowEventHandler, eventHandler}) => {
      if (rowEventHandler) {
        optionalRowProps[eventHandler] = event => {
          if (event.isDefaultPrevented()) {
            return;
          }
          rowEventHandler(rowData, rowNum);
        };
      }
    });

    if (onRowClick || rowDetails) {
      rowClasses.push(s.clickableDataRow);
    }

    if (rowDataHook) {
      if (typeof rowDataHook === 'string') {
        optionalRowProps['data-hook'] = rowDataHook;
      } else {
        optionalRowProps['data-hook'] = rowDataHook(rowData, rowNum);
      }
    }

    if (dynamicRowClass) {
      rowClasses.push(dynamicRowClass(rowData, rowNum));
    }

    optionalRowProps.className = classNames(rowClasses);

    const rowsToRender = [(
      <tr data-table-row="dataTableRow" key={rowNum} {...optionalRowProps}>
        {this.props.columns.map((column, colNum) => this.renderCell(rowData, column, rowNum, colNum))}
      </tr>
    )];

    if (rowDetails) {
      const showDetails = !!this.state.selectedRows[rowNum];

      rowsToRender.push(
        <tr key={`${rowNum}_details`} className={classNames(s.rowDetails)}>
          <td
            data-hook={`${rowNum}_details`} className={classNames(s.details, showDetails ? s.active : '')}
            colSpan={this.props.columns.length}
            >
            <div className={classNames(s.rowDetailsInner)}>
              <Animator show={showDetails} height>
                {rowDetails(rowData, rowNum)}
              </Animator>
            </div>
          </td>
        </tr>
      );
    }

    return rowsToRender;
  };

  renderCell = (rowData, column, rowNum, colNum) => {
    const classes = classNames({[s.important]: column.important});
    return (<td
      style={column.style} className={classes}
      key={colNum}
      >
      {column.render && column.render(rowData, rowNum)}
    </td>);
  };

  calcLastPage = ({data, itemsPerPage}) => Math.ceil(data.length / itemsPerPage) - 1;

  loadMore = () => {
    if (this.state.currentPage < this.state.lastPage) {
      this.setState({currentPage: this.state.currentPage + 1});
    } else {
      this.props.loadMore && this.props.loadMore();
    }
  }

  toggleRowDetails = selectedRow => {
    let selectedRows = {[selectedRow]: !this.state.selectedRows[selectedRow]};
    if (this.props.allowMultiDetailsExpansion) {
      selectedRows = Object.assign({}, this.state.selectedRows, {[selectedRow]: !this.state.selectedRows[selectedRow]});
    }
    this.setState({selectedRows});
  }
}

class TableHeader extends Component {
  static propTypes = {
    onSortClick: PropTypes.func,
    thPadding: PropTypes.string,
    thHeight: PropTypes.string,
    thFontSize: PropTypes.string,
    thBorder: PropTypes.string,
    thColor: PropTypes.string,
    thOpacity: PropTypes.string,
    thLetterSpacing: PropTypes.string,
    columns: PropTypes.array
  };

  renderSortingArrow = (sortDescending, colNum) => {
    if (sortDescending === undefined) {
      return null;
    }
    const sortDirectionClassName = sortDescending ? s.sortArrowAsc : s.sortArrowDesc;
    return <span data-hook={`${colNum}_title`} className={sortDirectionClassName}><ArrowVertical/></span>;
  };

  renderHeaderCell = (column, colNum) => {
    const style = {
      width: column.width,
      padding: this.props.thPadding,
      height: this.props.thHeight,
      fontSize: this.props.thFontSize,
      border: this.props.thBorder,
      color: this.props.thColor,
      opacity: this.props.thOpacity,
      letterSpacing: this.props.thLetterSpacing,
      cursor: column.sortable === undefined ? 'arrow' : 'pointer'
    };

    const optionalHeaderCellProps = {};
    if (column.sortable) {
      optionalHeaderCellProps.onClick = () => this.props.onSortClick && this.props.onSortClick(column, colNum);
    }
    return (
      <th
        style={style}
        key={colNum}
        {...optionalHeaderCellProps}
        >
        {column.title}{this.renderSortingArrow(column.sortDescending, colNum)}
      </th>);
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(this.renderHeaderCell)}
        </tr>
      </thead>);
  }
}

function validateData(props, propName) {
  if (props[propName]) {
    if (props[propName].constructor && props[propName].constructor.name && props[propName].constructor.name.toLowerCase().indexOf('array') > -1) {
      return null;
    } else {
      return Error('Data element must be an array type');
    }
  }
  return null;
}

DataTable.defaultProps = {
  data: [],
  columns: [],
  showHeaderWhenEmpty: false,
  infiniteScroll: false,
  itemsPerPage: 20,
  width: '100%',
  loadMore: null,
  hasMore: false,
  loader: <div className="loader">Loading ...</div>,
  scrollElement: null,
  useWindow: true,
  thPadding: '5px',
  thHeight: '36px',
  thFontSize: '12px'
};

DataTable.propTypes = {
  id: PropTypes.string,
  data: validateData,
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string
    ]).isRequired,
    render: PropTypes.func.isRequired,
    sortable: PropTypes.bool,
    sortDescending: PropTypes.bool
  })),
  showHeaderWhenEmpty: PropTypes.bool,
  rowDataHook: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string
  ]),
  rowClass: PropTypes.string,
  dynamicRowClass: PropTypes.func,
  onRowClick: PropTypes.func,
  onMouseEnterRow: PropTypes.func,
  onMouseLeaveRow: PropTypes.func,
  infiniteScroll: PropTypes.bool,
  itemsPerPage: PropTypes.number,
  width: PropTypes.string,
  loadMore: PropTypes.func,
  hasMore: PropTypes.bool,
  loader: PropTypes.node,
  useWindow: PropTypes.bool,
  scrollElement: PropTypes.object,
  thPadding: PropTypes.string,
  thHeight: PropTypes.string,
  thFontSize: PropTypes.string,
  thBorder: PropTypes.string,
  thColor: PropTypes.string,
  thOpacity: PropTypes.string,
  thLetterSpacing: PropTypes.string,
  rowDetails: PropTypes.func,
  allowMultiDetailsExpansion: PropTypes.bool,
  hideHeader: PropTypes.bool
};

DataTable.displayName = 'DataTable';

export default DataTable;
