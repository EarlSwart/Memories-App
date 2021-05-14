import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: green[800],
        }
    },
});

const App = () => {
    return (
        <BrowserRouter>
            <Container maxwidth="lg">
                <Navbar />
                <ThemeProvider theme={theme}>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/auth" exact component={Auth} />
                    </Switch>
                </ThemeProvider>
            </Container>
        </BrowserRouter>
    );
}

export default App;