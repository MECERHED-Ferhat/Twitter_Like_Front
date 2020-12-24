import React, { useEffect, useReducer, Fragment } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import "./follow.css";
import UserInline from "../utility/UserInline";
import FollowButton from "../utility/FollowButton";
import { LoadState, useLoadState } from "../../utility/LoadState";
import axiosInstance from "../../utility/APIFetch";
import axios from "axios";

const initialFollow = {
  followers: null,
  following: null,
};
const reducerFollow = (state, action) => {
  // action = {type, newItem, items}
  // action.type = [setFollowers, setFollowing]
  switch (action.type) {
    case "setFollowers":
      return {
        followers: action.items,
        following: state.following,
      };
    case "setFollowing":
      return {
        followers: state.followers,
        following: action.items,
      };
    case "editFollowers":
      return {
        followers: state.followers.map((i) =>
          i.id !== action.newItem.id ? i : action.newItem
        ),
        following: state.following,
      };
    case "editFollowing":
      return {
        followers: state.followers,
        following: state.following.map((i) =>
          i.id !== action.newItem.id ? i : action.newItem
        ),
      };
    default:
      return state;
  }
};

export default function Follow({ user }) {
  const [loadState, disLoadState] = useLoadState();
  const [{ followers, following }, disFollow] = useReducer(
    reducerFollow,
    initialFollow
  );

  useEffect(() => {
    var isMounted = true;
    const followersR = axiosInstance.get(user.followers);
    const followingR = axiosInstance.get(user.following);

    axios.all([followersR, followingR]).then(
      axios.spread((followersD, followingD) => {
        if (isMounted) {
          disFollow({
            type: "setFollowers",
            items: followersD ? followersD.data.results : null,
          });
          disFollow({
            type: "setFollowing",
            items: followingD ? followingD.data.results : null,
          });
        }
      })
    );

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (followers && following) disLoadState({ type: "render" });
    // eslint-disable-next-line
  }, [followers, following]);

  return (
    <div id="follow">
      <div id="follow-nav">
        <NavLink
          replace
          to="followers"
          className="follow-nav-link"
          activeClassName="follow-nav-active"
        >
          Followers
        </NavLink>
        <NavLink
          replace
          to="following"
          className="follow-nav-link"
          activeClassName="follow-nav-active"
        >
          Following
        </NavLink>
      </div>

      <div id="follow-user">
        <LoadState loadState={loadState}>
          <Switch>
            <Route exact path="/:username/followers">
              {followers ? (
                followers.map((i) => (
                  <UserInline key={i.username} user={i}>
                    {!i.is_current ? (
                      <div className="userline-btn">
                        <FollowButton
                          user={i}
                          editUserCb={(newUser) =>
                            disFollow({
                              type: "editFollowers",
                              newItem: newUser,
                            })
                          }
                        />
                      </div>
                    ) : (
                      <Fragment />
                    )}
                  </UserInline>
                ))
              ) : (
                <Fragment />
              )}
            </Route>

            <Route exact path="/:username/following">
              {following ? (
                following.map((i) => (
                  <UserInline key={i.username} user={i}>
                    {!i.is_current ? (
                      <div className="userline-btn">
                        <FollowButton
                          user={i}
                          editUserCb={(newUser) =>
                            disFollow({
                              type: "editFollowing",
                              newItem: newUser,
                            })
                          }
                        />
                      </div>
                    ) : (
                      <Fragment />
                    )}
                  </UserInline>
                ))
              ) : (
                <Fragment />
              )}
            </Route>
          </Switch>
        </LoadState>
      </div>
    </div>
  );
}
