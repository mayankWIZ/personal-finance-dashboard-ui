import React from 'react'
import { FormControl, Select, InputLabel } from '@mui/material'

export const CustomSelect = ( {isPrimary, label, labelId, formControlProps = {},...props} ) => {
  return (
    <FormControl variant={isPrimary?"outlined":"standard"} {...formControlProps}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        label={label}
        labelId={labelId}
        {...props}
      >
        {props.children}
      </Select>
    </FormControl>
  )
}


