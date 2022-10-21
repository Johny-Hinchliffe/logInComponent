import { createTheme } from '@mui/material/styles';
import { green, grey } from '@mui/material/colors';

export const basicTheme = createTheme({
  palette: {
    primary: {
      main: '#007234'
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

