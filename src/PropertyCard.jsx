import * as React from 'react'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import WorkIcon from '@mui/icons-material/Work'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export const PropertyCard = ({ property, closeView }) => {
  const formatCurrency = (value) => `£${Math.floor(value).toLocaleString()}`
  return (
    <Container component="main" maxWidth="xl">
      <Button variant="text" onClick={closeView}>
        Back to list
      </Button>
      <Typography variant="h5" color="text.secondary" sx={{ my: 4 }}>
        {property.propertyName} {formatCurrency(property.propertyValue)}
      </Typography>

      {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}

      <Grid container spacing={2}>
        <Grid item md={3} xs={12}>
          {' '}
          {/* 1st column */}
          <Typography
            sx={{ mb: 1.5 }}
            color="text.secondary"
            variant="p"
            component="h3"
          >
            Property details
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Property details"
                secondary={
                  <>
                    {property.propertyName}{' '}
                    <Link href={property.url}>View</Link>
                  </>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="price"
                secondary={formatCurrency(property.propertyValue)}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Stamp duty"
                secondary={
                  <>
                    Effective rate: {property.stampDuty.Effective_Rate} <br />
                    Stamp duty: {property.stampDuty.STAMP_DUTY_TO_PAY} <br />
                    Taxble Sum: {formatCurrency(
                      property.stampDuty.TAXABLE_SUM
                    )}{' '}
                    <br />
                  </>
                }
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          {' '}
          {/* 2nd column */}
          <Typography
            sx={{ mb: 1.5 }}
            color="text.secondary"
            variant="p"
            component="h3"
          >
            Rent details
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Monthly rental income"
                secondary={formatCurrency(property.monthlyRentalIncome)}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Annual rental income"
                secondary={formatCurrency(property.annualRentalIncome)}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Monthly operating costs"
                secondary={formatCurrency(property.monthlyOperatingCosts)}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Rental yield"
                secondary={`${property.rentalYield}%`}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          {' '}
          {/* 3rd column */}
          <Typography
            sx={{ mb: 1.5 }}
            color="text.secondary"
            variant="p"
            component="h3"
          >
            Mortgage
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Deposit"
                secondary={formatCurrency(property.deposit)}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Loan"
                secondary={formatCurrency(property.loan)}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Monthly mortgage"
                secondary={`£${Math.floor(property.monthlyMortgage)}`}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Interest rate"
                secondary={`${property.loanInterest}%`}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Loan to value (LTV)"
                secondary={`${Math.floor(property.ltv)}%`}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Repayment period"
                secondary={`${property.repaymentPeriod} years`}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Repayment type"
                secondary={
                  property.repaymentType === 'interestOnly'
                    ? 'Interest only mortgage'
                    : 'Repayment mortgage'
                }
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          {' '}
          {/* 4th column */}
          <Typography
            sx={{ mb: 1.5 }}
            color="text.secondary"
            variant="p"
            component="h3"
          >
            Profits
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Monthly profit after expenses"
                secondary={formatCurrency(property.profitAfterExpensesMonthly)}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Yearly profit after expenses"
                secondary={formatCurrency(property.profitAfterExpensesYearly)}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Total investment"
                secondary={formatCurrency(property.totalInvestment)}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Annual Profit Percentage"
                secondary={property.annualProfitPercentage}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Container>
  )
}
