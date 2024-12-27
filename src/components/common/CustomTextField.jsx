import React from 'react'
import { TextField } from '@mui/material'

export const CustomTextField = ({isPrimary,...props}) => {

  return (
    <TextField variant={isPrimary?"outlined":"standard"} {...props} />
  )
}

