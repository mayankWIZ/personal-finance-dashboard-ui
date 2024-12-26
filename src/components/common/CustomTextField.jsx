import { TextField } from '@mui/material'
import React from 'react'

export const CustomTextField = ({isPrimary,...props}) => {

  return (
    <TextField variant={isPrimary?"outlined":"standard"} {...props} />
  )
}

