import NewListingScreen from "./Screens/NewListingsScreen";
import HomeScreen from "./Screens/HeaderPages/HomeScreen";

import {
    Route,
    NavLink,
    Switch,
    BrowserRouter as Router,
} from "react-router-dom";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/newlistings" component={NewListingScreen} />
                <Route exact path="/" component={HomeScreen} />
            </Switch>
        </Router>
    );
}

export default App;
