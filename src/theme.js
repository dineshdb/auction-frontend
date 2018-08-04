import { createMuiTheme } from '@material-ui/core/styles';
import 'typeface-roboto'

export default createMuiTheme({
    palette: {
        primary: {
            light: '#536bea',
            main: '#caf6fb',
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
            'typeface-roboto',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'sans-serif',
            'Comic-sans',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        fontSize: "16px",
        fontWeight: "lighter",
    },
});