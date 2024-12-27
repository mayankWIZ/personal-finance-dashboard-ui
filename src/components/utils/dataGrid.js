import { getGridDateOperators, GRID_DATETIME_COL_DEF } from "@mui/x-data-grid";
import { CustomGridDateTimeCell, GridFilterDateInput } from "../common/CustomGridDateTimeCell";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { enUS as locale } from 'date-fns/locale';


const dateAdapter = new AdapterDateFns({ locale });

export const dateTimeColumnType = {
    ...GRID_DATETIME_COL_DEF,
    resizable: false,
    renderEditCell: (params) => {
      return <CustomGridDateTimeCell {...params} />;
    },
    filterOperators: getGridDateOperators(true).map((item) => ({
      ...item,
      InputComponent: GridFilterDateInput,
      InputComponentProps: { showTime: true },
    })),
    valueFormatter: (value) => {
      if (value) {
        return dateAdapter.format(value, 'keyboardDateTime');
      }
      return '';
    },
  };