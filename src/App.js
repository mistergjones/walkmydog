import NewListingScreen from "../src/Screens/NewListingScreen";
import HomeScreen from "./Screens/HomeScreen";

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
                <Route path="/newlisting" component={NewListingScreen} />
                <Route exact path="/" component={HomeScreen} />
            </Switch>
        </Router>
    );
}

export default App;
