import { useState } from "react";
import "./App.css";

import AboutUsContent from "./Screens/FooterPages/AboutUsContent";
import HomeScreen from "./Screens/HeaderPages/HomeScreen";
import LoginScreen from "./Screens/HeaderPages/LoginScreen";
import NewListingScreen from "./Screens/NewListingsScreen";
import OwnersScreen from "./Screens/HeaderPages/OwnersScreen";
import SignUpScreen from "./Screens/HeaderPages/SignUpScreen";
import ListingsDetailScreen from "./Screens/ListingsDetailScreen";
import routes from "./routes/routes";
import WalkersScreen from "./Screens/HeaderPages/WalkersScreen";
import AuthContext from "./context/authContext";
import {
    Route,
    Switch,
    BrowserRouter as Router,
    Redirect,
} from "react-router-dom";

// import bootstap the non-cenventional way
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Upload from "./Components/Upload/Upload";
import ProtectedRoute from "./Components/protectedRoute";
import ProfileScreen from "./Screens/ProfileScreen";

function App() {
    const [user, setUser] = useState();
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <Router>
                <Switch>
                    <Route path="/about" component={AboutUsContent} />
                    <ProtectedRoute path="/profile" component={ProfileScreen} />
                    <ProtectedRoute path="/walkers" component={WalkersScreen} />
                    <ProtectedRoute path="/owners" component={OwnersScreen} />
                    <Route path="/login" component={LoginScreen} />
                    <Route path="/signup" component={SignUpScreen} />
                    <ProtectedRoute
                        path="/newlistings"
                        component={NewListingScreen}
                    />
                    <ProtectedRoute path="/upload" component={Upload} />
                    <ProtectedRoute
                        path={routes.LISTING_DETAIL_BY_ID}
                        component={ListingsDetailScreen}
                    />
                    <Route exact path="/" component={HomeScreen} />
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
