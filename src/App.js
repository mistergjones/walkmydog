import "./App.css";

import HomeScreen from "./Screens/HeaderPages/HomeScreen";
import LoginScreen from "./Screens/HeaderPages/LoginScreen";
import NewListingScreen from "./Screens/NewListingsScreen";
import SignUpScreen from "./Screens/HeaderPages/SignUpScreen";

import {
    Route,
    NavLink,
    Switch,
    BrowserRouter as Router,
} from "react-router-dom";

// import bootstap the non-cenventional way
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={LoginScreen} />
                <Route path="/signup" component={SignUpScreen} />
                <Route path="/newlistings" component={NewListingScreen} />
                <Route exact path="/" component={HomeScreen} />
            </Switch>
        </Router>
    );
}

export default App;
