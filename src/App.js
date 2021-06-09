import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Pages/Login";

import { useAuth } from "./Hooks/useAuth";
import { makeStyles } from "@material-ui/core";
import Progress from "@material-ui/core/CircularProgress";
import Dashboard from "./Components/Dashboard";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
    },
}));

const App = () => {
    const classes = useStyles();
    const { loading } = useAuth();

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <div className="login-wrapper">
                        <Login />
                    </div>
                </Route>
                <Route exact path="/dashboard">
                    {loading ? (
                        <div className={classes.root}>
                            <Progress />;
                        </div>
                    ) : (
                        <Dashboard />
                    )}
                </Route>
            </Switch>
        </Router>
    );
};

export default App;