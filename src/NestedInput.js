import * as React from 'react'
import TextField from '@mui/material/TextField'
import { useFormContext, Controller, Form } from 'react-hook-form'
import { FormControl } from '@mui/material'
import { Box } from '@mui/material'
export const NestedInput = ({ name, text, type, inputMode, disabled }) => {
  const { control } = useFormContext() // retrieve all hook methods

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              size="small"
              label={text}
              {...field}
              disabled={disabled}
              inputProps={{
                inputMode: inputMode,
                style: { backgroundColor: '#fff' },
              }}
              id={name}
              type={type}
              required
              autoFocus
            />
          </FormControl>
        )
      }}
    />
  )
}
