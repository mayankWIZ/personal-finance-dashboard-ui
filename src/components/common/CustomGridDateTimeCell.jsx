import { InputBase, styled } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";

export const GridEditDateInput = styled(InputBase)({
  fontSize: 'inherit',
  padding: '0 9px',
});

export const WrappedGridEditDateInput = (props) => {
  const { InputProps, focused, ...other } = props;
  return <GridEditDateInput fullWidth {...InputProps} {...other} />;
}

export const CustomGridDateTimeCell = ({ id, field, value, colDef }) => {
    const apiRef = useGridApiContext();
  
    const Component = colDef.type === 'dateTime' ? DateTimePicker : DatePicker;
  
    const handleChange = (newValue) => {
      apiRef.current.setEditCellValue({ id, field, value: newValue });
    };
  
    return (
      <Component
        value={value}
        autoFocus
        onChange={handleChange}
        slots={{ textField: WrappedGridEditDateInput }}
      />
    );
  }

export const GridFilterDateInput = (props) => {
    const { item, showTime, applyValue, apiRef } = props;
  
    const Component = showTime ? DateTimePicker : DatePicker;
  
    const handleFilterChange = (newValue) => {
      applyValue({ ...item, value: newValue });
    };
  
    return (
      <Component
        value={item.value ? new Date(item.value) : null}
        autoFocus
        label={apiRef.current.getLocaleText('filterPanelInputLabel')}
        slotProps={{
          textField: {
            variant: 'standard',
          },
          inputAdornment: {
            sx: {
              '& .MuiButtonBase-root': {
                marginRight: -1,
              },
            },
          },
        }}
        onChange={handleFilterChange}
      />
    );
  }