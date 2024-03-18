import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import MenuItem from '@mui/material/MenuItem'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useForm, FormProvider } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { sortByProfitability } from './calculate'
import { FormControl, Icon } from '@mui/material'
import ResultsTable from './table'
import { InputLabel } from '@mui/material'
import { Select } from '@mui/material'
import { NestedInput } from './NestedInput'
import { InputTable } from './InputTable'
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import HouseRoundedIcon from '@mui/icons-material/HouseRounded'
import Avatar from '@mui/material/Avatar'
import { DrawerSlider } from './DrawerSlider'
import Stack from '@mui/material/Stack'
import { PropertyCard } from './PropertyCard'
import { useAppState } from './localstorage'
import HeaderBar from './HeaderBar'
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="/">
        Lets make some cash on this
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const defaultTheme = createTheme({
  palette: {
    background: {
      default: '#e7e7e7', // Change this to your desired background color
    },
  },
})

export default function App() {
  const { properties, setProperties, results, setResults } = useAppState()
  const [expandView, setExpandView] = React.useState({})

  const methods = useForm({
    defaultValues: {
      id: '',
      propertyName: '',
      propertyValue: '',
      loan: '',
      deposit: '',
      monthlyOperatingCosts: '',
      monthlyRentalIncome: '',
      loanInterest: '',
      repaymentPeriod: '',
      repaymentType: 'interestOnly',
      mortgageTerm: 0,
      url: '',
    },
  })

  const { watch, setValue } = methods
  const [age, setAge] = React.useState('repayment')
  const handleChange = (event) => {
    setAge(event.target.value)
  }
  const propertyValue = watch('propertyValue')
  const deposit = watch('deposit')
  React.useEffect(() => {
    const loan = propertyValue - deposit
    setValue('loan', loan)
  }, [deposit, propertyValue, setValue])
  const inputs = [
    {
      name: 'propertyName',
      text: 'Property Name',
      type: 'text',
      inputMode: 'text',
    },
    {
      name: 'url',
      text: 'URL',
      type: 'text',
      inputMode: 'text',
    },
    {
      name: 'propertyValue',
      text: 'Value',
      type: 'text',
      inputMode: 'text',
    },
    { name: 'deposit', text: 'Deposit', type: 'text', inputMode: 'text' },
    {
      name: 'loan',
      text: 'Loan',
      type: 'text',
      inputMode: 'text',
      disabled: true,
    },

    {
      name: 'monthlyOperatingCosts',
      text: 'Monthly Operating Costs',
      type: 'number',
      inputMode: 'numeric',
    },
    {
      name: 'monthlyRentalIncome',
      text: 'Monthly Rental Income',
      type: 'number',
      inputMode: 'numeric',
    },
    {
      name: 'loanInterest',
      text: 'Loan Interest',
      type: 'number',
      inputMode: 'numeric',
    },
    {
      name: 'repaymentPeriod',
      text: 'Repayment Period',
      type: 'number',
      inputMode: 'numeric',
    },
    {
      name: 'mortgageTerm',
      text: 'Mortgage term',
      type: 'number',
      inputMode: 'numeric',
    },
  ]

  const addAnotherProperty = () => {
    const id = uuidv4()
    const newProperty = { ...methods.getValues(), id }

    setProperties((prevResults) => [...prevResults, newProperty])
    methods.setValue('propertyName', `Property ${properties.length + 2}`)
  }
  React.useEffect(() => {
    methods.handleSubmit(onSubmit)()
  }, [properties])

  // const handleSubmit = (e) => {
  //   methods.handleSubmit(onSubmit)()
  // }

  const onSubmit = (e) => {
    setResults(sortByProfitability(properties))
  }

  const onDelete = (ids) => {
    setResults((prevResults) =>
      prevResults.filter((result) => !ids.includes(result.id))
    )
    setProperties((prevResults) =>
      prevResults.filter((result) => !ids.includes(result.id))
    )
  }

  const handleExpand = (event, id) => {
    setExpandView(results.find((result) => result.id === id))
  }

  const closeView = () => {
    setExpandView({})
  }
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }
  console.log(expandView)
  console.log('results', results)
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box>
        <CssBaseline />

        <Box>
          <FormProvider {...methods}>
            <DrawerSlider toggleDrawer={toggleDrawer} open={open}>
              <Container component="main" maxWidth="xs">
                <Box
                  sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <HouseRoundedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Add Property
                  </Typography>
                  <Box component="div" sx={{ mt: 2 }}>
                    {inputs.map((input) => (
                      <NestedInput key={input.name} {...input} />
                    ))}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel id="demo-simple-select-label">
                        Repayment Type
                      </InputLabel>
                      <Select
                        {...methods.register('repaymentType')}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        size="small"
                        label="Repayment type"
                        onChange={handleChange}
                      >
                        <MenuItem value="interestOnly">Interest only</MenuItem>
                        <MenuItem value="repayment">Repayment</MenuItem>
                      </Select>
                    </FormControl>

                    <Stack direction="row" spacing={2}>
                      <Button
                        disableElevation
                        size="small"
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={addAnotherProperty}
                      >
                        Add {properties.length > 0 && properties.length}
                      </Button>
                      {/* <Button
                    size="small"
                    disableElevation
                    type="submit"
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                  >
                    Calculate
                  </Button> */}
                    </Stack>
                  </Box>
                </Box>
              </Container>
            </DrawerSlider>
          </FormProvider>
          {/* <InputTable properties={properties} handleDelete={onDelete} /> */}
          <HeaderBar setOpen={setOpen} />

          {expandView.id ? (
            <PropertyCard property={expandView} closeView={closeView} />
          ) : (
            <Container component="main" maxWidth="xl">
              <ResultsTable
                results={results}
                handleDelete={onDelete}
                handleExpand={handleExpand}
              />
            </Container>
          )}
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Box>
    </ThemeProvider>
  )
}
