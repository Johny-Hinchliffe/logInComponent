import { createTheme } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';

export const basicTheme = createTheme({
  palette: {
    primary: {
      main: blue[500]
    },
    secondary: {
      main: grey[500]
    },
    typography: {
      fontFamily: "Roboto",
      fontSize: 15,
      h1: {
        // incase h1 needs to have a separate fontFamily
        fontFamily: "Roboto",
        fontSize: 15
      }
    }
  }
});

