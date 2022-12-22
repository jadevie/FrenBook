import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";

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
                <h1>FrenBook</h1>
            </Route>
        </Switch>
    );
}
