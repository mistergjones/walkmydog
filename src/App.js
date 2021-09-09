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
import WalkerHistoryScreen from "./Screens/WalkerHistoryScreen";
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
// import ProfileScreen from "./Screens/ProfileScreen";
import OwnerDashboardScreen from "./Screens/OwnerDashboardScreen";
import WalkerDashboardScreen from "./Screens/WalkerDashboardScreen";
import NotFoundScreen from "./Screens/NotFoundScreen";

// GJ: 06/08: added the below screen
import OwnerProfileScreen from "./Components/Profiles/OwnerProfileScreen";
import WalkerProfileScreen from "./Components/Profiles/WalkerProfileScreen";
import BMapsDistance from './maps/BMapsDistance';
import CreateListingScreen from './Screens/CreateListingScreen';

function App() {
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    return (
        <AuthContext.Provider
            value={{ user, setUser, errorMessage, setErrorMessage }}
        >
            <Router>
                <Switch>
                    <ProtectedRoute path={routes.CREATE_LISTING_OWNER} component={CreateListingScreen} />
                    <Route path="/distance" component={BMapsDistance} />
                    <Route path={routes.ABOUT} component={AboutUsContent} />
                    <ProtectedRoute
                        path={routes.PROFILE_WALKER}
                        component={WalkerProfileScreen}
                    />
                    <ProtectedRoute
                        path={routes.PROFILE_OWNER}
                        component={OwnerProfileScreen}
                    />
                    <ProtectedRoute
                        path={routes.WALKERS}
                        component={WalkersScreen}
                    />
                    <ProtectedRoute
                        path={routes.OWNERS}
                        component={OwnersScreen}
                    />
                    <ProtectedRoute
                        path={routes.DASHBOARD_OWNER}
                        component={OwnerDashboardScreen}
                    />
                    <ProtectedRoute
                        path={routes.DASHBOARD_WALKER}
                        component={WalkerDashboardScreen}
                    />
                    <ProtectedRoute
                        path={routes.HISTORY}
                        component={WalkerHistoryScreen}
                    />
                    <Route path={routes.LOGIN} component={LoginScreen} />
                    <Route path={routes.SIGN_UP} component={SignUpScreen} />

                    <ProtectedRoute
                        path={routes.NEW_LISTINGS}
                        component={NewListingScreen}
                    />
                    <Route path="/upload" component={Upload} />
                    <ProtectedRoute
                        path={routes.LISTING_DETAIL_BY_ID}
                        component={ListingsDetailScreen}
                    />
                    <Route path={routes.NOT_FOUND} component={NotFoundScreen} />
                    <Route exact path={routes.HOME} component={HomeScreen} />
                    <Redirect to={routes.NOT_FOUND} />
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
