import React from 'react'
import { Button } from '@mui/material'
export const CustomButton = ( {isPrimary, ...props} ) => {
  return (
    <Button variant={isPrimary?"contained":"outlined"} {...props} />
  )
}


