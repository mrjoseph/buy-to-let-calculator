import React, { useState, useMemo } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import { visuallyHidden } from '@mui/utils'
import { EnhancedTableToolbar } from './EnhancedTableToolbar'
import Link from '@mui/material/Link'
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}
//propertyName
const headCells = [
  {
    id: 'propertyName',
    numeric: false,
    disablePadding: true,
    label: 'Property Name',
  },
  {
    id: 'url',
    numeric: false,
    disablePadding: true,
    label: 'URL',
  },
  {
    id: 'annualRentalIncome',
    numeric: false,
    disablePadding: true,
    label: 'Rent(Y)',
  },
  {
    id: 'rentalYield',
    numeric: false,
    disablePadding: false,
    label: 'Yield',
  },
  {
    id: 'monthlyCashFlow',
    numeric: true,
    disablePadding: false,
    label: 'Cash Flow (M)',
  },
  {
    id: 'yearlyCashFlow',
    numeric: true,
    disablePadding: false,
    label: 'Cash Flow(Y)',
  },
  {
    id: 'monthlyMortgage',
    numeric: true,
    disablePadding: false,
    label: 'Mortgage(M)',
  },
  {
    id: 'profitAfterExpensesMonthly',
    numeric: true,
    disablePadding: false,
    label: 'Profit(M)',
  },
  {
    id: 'profitAfterExpensesYearly',
    numeric: true,
    disablePadding: false,
    label: 'Profit(Y)',
  },
  {
    id: 'ltv',
    numeric: true,
    disablePadding: false,
    label: 'LTV',
  },
  {
    id: 'monthlyRentalIncome',
    numeric: true,
    disablePadding: false,
    label: 'Rent(M)',
  },
  {
    id: 'coverage',
    numeric: true,
    disablePadding: false,
    label: 'Coverage',
  },
]
//averageAnnualROI
function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{ fontWeight: 'bold' }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default function ResultsTable({ results, handleDelete, handleExpand }) {
  const rows = results
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('calories')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)

  const [rowsPerPage, setRowsPerPage] = useState(25)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const onDelete = () => {
    handleDelete(selected)
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (id) => selected.indexOf(id) !== -1

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  )

  return (
    <Box sx={{ width: '100%', pt: 3 }}>
      <Paper sx={{ width: '100%', mb: 2 }} elevation={0}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
          onDelete={onDelete}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'small'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id)
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleExpand(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={`row-${index}-${row.id}`}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer', position: 'relative' }}
                  >
                    <TableCell padding="checkbox" sx={{ zIndex: 1 }}>
                      <Checkbox
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClick(event, row.id)
                        }}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.propertyName}
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      sx={{
                        whiteSpace: 'nowrap',
                        zIndex: 1,
                      }}
                    >
                      <Link
                        href={row.url}
                        target="_blank"
                        rel="noopener"
                        onClick={(event) => {
                          event.stopPropagation() // Stop event propagation
                        }}
                      >
                        Link
                      </Link>
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      £{row.annualRentalIncome.toLocaleString()}
                    </TableCell>

                    <TableCell align="left">
                      {Math.floor(row.rentalYield)}%
                    </TableCell>
                    <TableCell align="right">
                      £{Math.floor(row.monthlyCashFlow).toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      £{Math.floor(row.yearlyCashFlow).toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      £{Math.floor(row.monthlyMortgage)}
                    </TableCell>
                    <TableCell align="right">
                      £{Math.floor(row.profitAfterExpensesMonthly)}
                    </TableCell>
                    <TableCell align="right">
                      £{Math.floor(row.profitAfterExpensesYearly)}
                    </TableCell>
                    <TableCell align="right">{Math.floor(row.ltv)}%</TableCell>

                    <TableCell align="right">
                      £{row.monthlyRentalIncome.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {(row.monthlyMortgage / 100) * 150 <
                      row.monthlyRentalIncome
                        ? 'yes'
                        : 'no'}
                    </TableCell>
                  </TableRow>
                )
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[15, 20, 25, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}
