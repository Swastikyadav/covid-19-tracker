import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import { EnhancedTableHead, EnhancedTableBody, EnhancedTableToolbar } from "../";
import { fetchAllCountryData } from "../../api";
import LoaderImage from "../../images/loader.svg";

import styles from "./Table.module.css";

function EnhancedTable() {
  const [allCountryData, setAllCountryData] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchAPI = async () => {
      setAllCountryData(await fetchAllCountryData());
    }

    fetchAPI();
  }, []);

  function createData(country, confirmed, recovered, deaths) {
    return { country, confirmed, recovered, deaths };
  }

  const rows = allCountryData.map(data => {
    return createData(data.name, data.confirmed, data.recovered, data.deaths)
  });
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }));

  const classes = useStyles();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={styles.container}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <TableContainer className={styles.table}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            {rows.length ? (
              <EnhancedTableBody
              rows={rows}
              order={order}
              orderBy={orderBy}
              page={page}
              rowsPerPage={rowsPerPage}
            />
            ) : (
              <div className={styles.imageContainer}>
                <img src={LoaderImage} alt="bouncing-ball" />
              </div>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default EnhancedTable;