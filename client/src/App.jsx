import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { Routes, Route, useNavigate } from "react-router-dom";
import Alltask from "./pages/Alltask";
import Importanttask from "./pages/Importanttask";
import Incompletetask from "./pages/Incompletetask";
import Completedtask from "./pages/Completedtask";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth";

function App() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((store) => store.auth.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    } else if (!isLogin) {
      Navigate("/login");
    }
  }, []);

  return (
    <div className="bg-gray-500 p-2 h-screen relative">
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route index element={<Alltask />} />
          <Route path="/completedTask" element={<Completedtask />} />
          <Route path="/importantTask" element={<Importanttask />} />
          <Route path="/incompleteTask" element={<Incompletetask />} />
        </Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
