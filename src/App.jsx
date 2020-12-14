import { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./app.css";
import ProtectedRouter from "./login/ProtectedRouter";
import AnonymRouter from "./login/AnonymRouter";
import Login from "./login/Login";
import Main from "./main/Main";
import UserContext from "./context/userContext";
import DisUserContext from "./context/disUserContext";
import { LoadState, useLoadState, ERRORS } from "./utility/LoadState";

const initialUser = {
  isLog: false,
  token: null,
  header: null,
  user: null,
};
const reducerUser = (state, action) => {
  // action = { type, token, user }
  // action.type = ["logout", "setToken", "login"]
  switch (action.type) {
    case "logout":
      return initialUser;
    case "setToken":
      return {
        isLog: false,
        token: action.token,
        header: new Headers({ Authorization: `Token ${action.token}` }),
        user: null,
      };
    case "login":
      return {
        ...state,
        isLog: true,
        user: action.user,
      };
    default:
      return state;
  }
};

function App() {
  const [currentUser, disCurrentUser] = useReducer(reducerUser, initialUser);
  const [loadState, disLoadState] = useLoadState();

  useEffect(() => {
    disCurrentUser({
      type: "setToken",
      token: "4e56d32d66a927d29a3c0f44924b3c7c7e15c1db",
    });
  }, []);

  useEffect(() => {
    if (currentUser.token) {
      fetch("http://127.0.0.1:8000/login/", {
        headers: currentUser.header,
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((res) => {
          if (res) {
            disCurrentUser({
              type: "login",
              user: res,
            });
          } else {
            disLoadState({
              type: "error",
              error: ERRORS.DEFAULT,
            });
          }
        });
    }
    // eslint-disable-next-line
  }, [currentUser.token]);

  useEffect(() => {
    if (currentUser.isLog) disLoadState({ type: "render" });
    // eslint-disable-next-line
  }, [currentUser.isLog]);

  const handleSubmitLogin = (e, form) => {
    e.preventDefault();
    const fd = new FormData(form);
    fetch("http://127.0.0.1:8000/api_auth_token/", {
      method: "POST",
      body: fd,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((res) => {
        if (res) {
          disCurrentUser({ type: "setToken", token: res.token });
        } else {
          disLoadState({ type: "error", error: ERRORS.E404 });
        }
      });
  };

  return (
    <Router>
      <LoadState loadState={loadState}>
        <UserContext.Provider value={currentUser}>
          <Switch>
            <AnonymRouter exact path="/login">
              <Login onSubmitForm={handleSubmitLogin} />
            </AnonymRouter>

            <ProtectedRouter>
              <DisUserContext.Provider value={disCurrentUser}>
                <Main />
              </DisUserContext.Provider>
            </ProtectedRouter>
          </Switch>
        </UserContext.Provider>
      </LoadState>
    </Router>
  );
}

export default App;
