import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        primary: {
            light: '#536bea',
            main: '#f8fbe4',
            dark: '#abacff',
            contrastText: '#5b5b5b',
        },
        secondary: {
            light: '#4fffa5',
            main: "#34a4ff",
            dark: '#e56edc',
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
        fontSize: "16px",
        fontWeight: "lighter",
    },
});