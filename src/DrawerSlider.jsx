import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'

export const DrawerSlider = ({ children, toggleDrawer, open }) => {
  const DrawerList = (
    <Box sx={{ width: '100%', p: 2 }} role="presentation">
      {children}
    </Box>
  )

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  )
}
