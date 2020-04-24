import React from "react";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

const EnhancedTableBody = ({ rows, order, orderBy, page, rowsPerPage }) => {
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <TableBody>
      {stableSort(rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => {

          return (
            <TableRow
              hover
              tabIndex={-1}
              key={row.country}
            >
              <TableCell component="th" scope="row" padding="none">
                {row.country}
              </TableCell>
              <TableCell align="right">{row.confirmed}</TableCell>
              <TableCell align="right">{row.recovered}</TableCell>
              <TableCell align="right">{row.deaths}</TableCell>
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
        <TableRow>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
}

export default EnhancedTableBody;