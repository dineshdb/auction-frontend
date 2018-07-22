import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {

        primary: {
            light: '#536bea',
            main: '#2196F3',
            dark: '#ff74ad',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#4fffa5',
            main: "#ea007e",
            dark: '#ea007e',
            contrastText: '#000',
        },

    },
    overrides: {
        MuiButton: {
            // Name of the rule
            root: {
                border: 0,
                color: 'white',
                height: 48,
                padding: '0 30px',
            }}},
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