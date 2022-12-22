import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import LogoutButton from "./components/auth/LogoutButton";
import SignUpForm from "./components/auth/SignUpForm";
import SplashPage from "./components/SplashPage/SplashPage";

export default function AppRoutes() {
    return (
        <Switch>
            <Route path='/login' exact={true}>
                <LoginForm />
            </Route>
            <Route path='/signup' exact={true}>
                <SignUpForm />
            </Route>
            <Route path='/' exact={true} >
                <SplashPage />
                <LogoutButton />
            </Route>
        </Switch>
    );
}
