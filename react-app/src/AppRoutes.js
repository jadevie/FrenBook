import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import LogoutButton from "./components/auth/LogoutButton";
import SplashPage from "./components/SplashPage/SplashPage";

export default function AppRoutes() {
    return (
        <Switch>
            <Route path='/' exact={true} >
                <SplashPage />
                <LogoutButton />
            </Route>
        </Switch>
    );
}
