import { useContext, useReducer, Fragment, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import MainHeader from "../utility/MainHeader";
import Profile from "./Profile";
import UserNews from "./UserNews";
import Follow from "./Follow";
import { LoadState, useLoadState } from "../../utility/LoadState";
import { Error404 } from "../../error/Error";
import UserContext from "../../context/userContext";

const initialUser = null;
const reducerUser = (state, action) => {
  // action = { type, user }
  // action.type = ["setUser"]
  switch (action.type) {
    case "setUser":
      return action.user;
    case "editUser":
      return {
        ...action.user,
        follower_count:
          state.follower_count + (action.user.is_following ? 1 : -1),
      };
    default:
      return state;
  }
};

export default function User({ match }) {
  const { header } = useContext(UserContext);
  const [user, disUser] = useReducer(reducerUser, initialUser);
  const [loadState, disLoadState] = useLoadState();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/user/detail/${match.params.username}`, {
      headers: header,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((res) => disUser({ type: "setUser", user: res }));
    // eslint-disable-next-line
  }, [match.params]);

  useEffect(() => {
    if (user) disLoadState({ type: "render" });
    // eslint-disable-next-line
  }, [user]);

  return (
    <LoadState loadState={loadState}>
      {user ? (
        <Switch>
          <Route exact path="/:username">
            <MainHeader>
              <div className="cwd-user">
                <span className="cwd-user-name">{user.full_name}</span>
                <span className="cwd-user-count">
                  {user.tweet_count} Tweets
                </span>
              </div>
            </MainHeader>

            <Profile
              user={user}
              editUserCb={(newUser) =>
                disUser({ type: "editUser", user: newUser })
              }
            />

            <UserNews key={user.username} user={user} />
          </Route>

          <Route
            exact
            strict
            path={["/:username/following", "/:username/followers"]}
          >
            <MainHeader>
              <div className="cwd-user">
                <span className="cwd-user-name">{user.full_name}</span>
                <span className="cwd-user-count">@{user.username}</span>
              </div>
            </MainHeader>

            <Follow user={user} />
          </Route>

          <Route>
            <Error404 />
          </Route>
        </Switch>
      ) : (
        <Fragment />
      )}
    </LoadState>
  );
}
