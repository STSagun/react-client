import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    htmlFontSize: 10,
    fontFamily: [
      '"Comic Sans MS", cursive, sans-serif',
    ].join(','),
  },
});
export default theme;
