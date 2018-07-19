import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        primary: {
            light: '#536bea',
            main: '#2bc6ea',
            dark: '#ea4a8c',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#4fffa5',
            main: '#eaeff1',
            dark: '#ff74ad',
            contrastText: '#000',
        },

    },
    overrides: {
        Button: {
            root: {
                color: "#fe4e81",
                '&:hover': {
                    backgroundColor: '#bfe8e4'
                }
            }
        }
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        fontSize: "21px",
        fontWeight: "lighter",
    },
});