import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import LogoutButton from "./components/auth/LogoutButton";
import HomePage from "./components/HomePage/HomePage";
import SplashPage from "./components/SplashPage/SplashPage";


export default function AppRoutes() {
    const user = useSelector(state => state.session.user);
    return (
        <Switch>
            <Route path='/' exact={true} >
                {!user ? <SplashPage /> : <HomePage />}
            </Route>
            <Route path='/logout' exact={true}>
                <LogoutButton />
            </Route>
        </Switch>
    );
}
