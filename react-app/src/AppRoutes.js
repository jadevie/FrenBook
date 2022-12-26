import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import SplashPage from "./components/SplashPage/SplashPage";


export default function AppRoutes() {
    const user = useSelector(state => state.session.user);
    return (
        <Route path='/'>
            {!user ? <SplashPage /> : <HomePage />}
        </Route>
    );
}
