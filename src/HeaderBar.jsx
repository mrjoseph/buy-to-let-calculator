import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import CalculateIcon from '@mui/icons-material/Calculate'

export default function HeaderBar({ setOpen }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <CalculateIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Buy to let comparison calculator
          </Typography>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Add property
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
