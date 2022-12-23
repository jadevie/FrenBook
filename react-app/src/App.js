import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreUser } from "./store/session";
import AppRoutes from "./AppRoutes";
import Modals from "./components/Modals/Modals";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  return (
    <>
      <div>
        <AppRoutes />
        <Modals />
      </div>
    </>
  );
}
