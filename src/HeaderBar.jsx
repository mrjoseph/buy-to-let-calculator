import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { useMediaQuery } from '@mui/material'
import CalculateIcon from '@mui/icons-material/Calculate'
import AddIcon from '@mui/icons-material/Add'
export default function HeaderBar({ setOpen }) {
  const isSmallScreen = useMediaQuery('(max-width:900px)')
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
          {!isSmallScreen && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Buy to let comparison calculator
            </Typography>
          )}

          <Box>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => setOpen(true)}
            >
              {!isSmallScreen ? <>Add property</> : <AddIcon />}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
