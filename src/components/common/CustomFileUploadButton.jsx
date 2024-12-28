import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FormControl, FormHelperText, Typography } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function returnFileSize(number) {
  if (number < 1e3) {
    return `${number} bytes`;
  } else if (number >= 1e3 && number < 1e6) {
    return `${(number / 1e3).toFixed(1)} KB`;
  } else {
    return `${(number / 1e6).toFixed(1)} MB`;
  }
}

function validFileType(file) {
  return file.type === 'text/csv';
}

export default function CustomFileUploadButton({isPrimary, fileSetter, ...props}) {
  const [file, setFile] = useState(null);
  return (
    <FormControl>
      <Button
        component="label"
        role={undefined}
        variant={isPrimary?"contained":"outlined"}
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        {...props}
      >
        Upload files
        <VisuallyHiddenInput
          type="file"
          accept='text/csv'
          onChange={(event) => {
            if (
              event.target.files.length <= 0 ||
              !validFileType(event.target.files[0])
            ) {
              setFile(null);
              fileSetter(null);
              return alert('Please select a .csv file');
            }
            setFile(event.target.files[0]);
            fileSetter(event.target.files[0]);
          }}
        />
      </Button>
      <FormHelperText>Only CSV files are allowed</FormHelperText>
      <Typography variant="body2" color="textSecondary">{file?file.name:"No file selected"}{file?` (${returnFileSize(file.size)})`:""}  </Typography>
    </FormControl>
  );
}