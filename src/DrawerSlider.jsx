import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'

import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import { pink } from '@mui/material/colors'
export const DrawerSlider = ({ children, toggleDrawer, open }) => {
  // const [open, setOpen] = React.useState(false)

  // const toggleDrawer = (newOpen) => () => {
  //   setOpen(newOpen)
  // }

  const DrawerList = (
    <Box sx={{ width: 550, p: 2 }} role="presentation">
      {children}
    </Box>
  )

  return (
    <div>
      {/* <IconButton aria-label="delete" onClick={toggleDrawer(true)}>
        <Avatar sx={{ bgcolor: pink[500] }} sizes="large">
          <AddCircleOutlinedIcon />
        </Avatar>
      </IconButton> */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  )
}
