import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
export const InputTable = ({ properties, children, handleDelete }) => {
  const deleteProperty = (e) => {
    handleDelete(e)
  }
  const tabelCellTitle = [
    'property Name',
    'url',
    'Value(£)',
    'Deposit(£)',
    'Loan(£)',
    'Operating Costs(£)',
    'Rental Income(£)',
    'Interest Rate(%)',
    'Repayment Period (Years)',
    'Repayment Type',
    '',
  ]
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" size={'small'}>
        <TableHead>
          <TableRow>
            {tabelCellTitle.map((title, i) => (
              <TableCell key={`${title}-${i}`} sx={{ whiteSpace: 'nowrap' }}>
                <strong>{title}</strong>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {properties.map((row, i) => (
            <TableRow
              key={`${row.propertyName}-${i}`}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell component="td" scope="row">
                {row.propertyName}
              </TableCell>
              <TableCell component="td" scope="row">
                <Link href={row.url} target="_blank" rel="noopener">
                  Link
                </Link>
              </TableCell>
              <TableCell component="td" scope="row" sx={{ p: 1 }}>
                £{parseFloat(row.propertyValue).toLocaleString()}
              </TableCell>
              <TableCell component="td">
                £{parseFloat(row.deposit).toLocaleString()}
              </TableCell>
              <TableCell component="td">
                £{parseFloat(row.loan).toLocaleString()}
              </TableCell>

              <TableCell component="td">
                £{parseFloat(row.monthlyOperatingCosts).toLocaleString()}
              </TableCell>
              <TableCell component="td">
                {' '}
                £{parseFloat(row.monthlyRentalIncome).toLocaleString()}
              </TableCell>
              <TableCell component="td">{row.loanInterest}%</TableCell>
              <TableCell component="td">{row.repaymentPeriod} Years</TableCell>
              <TableCell component="td">
                {row.repaymentType === 'repayment'
                  ? 'Repayment'
                  : 'Interest only'}
              </TableCell>
              <TableCell component="td">
                <div>
                  <IconButton
                    color="primary"
                    aria-label="delete"
                    onClick={() => deleteProperty(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>{children}</TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
