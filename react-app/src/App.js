import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreUser } from "./store/session";
import Modals from "./components/Modals/Modals";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import SplashPage from "./components/SplashPage/SplashPage";




export default function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  return (
    <>
      <div>
        <Route path='/'>
          {!user ? <SplashPage /> : <HomePage />}
        </Route>
        <Modals />
      </div>
    </>
  );
}
