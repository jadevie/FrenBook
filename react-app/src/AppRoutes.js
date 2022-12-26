import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import NewFeed from "./components/HomePage/NewFeed/NewFeed";
import SplashPage from "./components/SplashPage/SplashPage";


export default function AppRoutes() {
    const user = useSelector(state => state.session.user);
    return (
        <Switch>
            <Route path='/'>
                {!user ? <SplashPage /> : <HomePage />}
            </Route>
            <Route path='/:postId'>
                <NewFeed />
            </Route>
        </Switch>
    );
}
