import ReactTable, { ReactTableDefaults } from 'react-table';
import 'react-table/react-table.css';

import ListPagination from './ListPagination';
import '../../../css/List.css';

Object.assign(ReactTableDefaults, {
  showPageSizeOptions: false,
  defaultPageSize: 10,
  PaginationComponent: ListPagination,
});

export default ReactTable;
