import { Fragment } from "react";
import { Link } from "react-router-dom";
import "./profile.css";
import FollowButton from "../utility/FollowButton";

export default function Profile({ user, editUserCb }) {
  return (
    <Fragment>
      <div id="user-wallpaper" />

      <div id="user">
        <div id="user-container">
          <div id="user-top-container">
            <div id="user-pic-base">
              <div id="user-pic-container">
                <div id="user-pic">
                  <img src={user.picture} alt="" />
                </div>
              </div>
            </div>

            {user.is_current ? (
              <button id="user-edit">Set profile</button>
            ) : (
              <FollowButton user={user} editUserCb={editUserCb} />
            )}
          </div>

          <b id="user-name">{user.full_name}</b>
          <span id="user-adr">@{user.username}</span>
          <div id="user-time">
            <i className="far fa-calendar-alt"></i>
            <span>Joined {user.timestamp}</span>
          </div>
          <div id="user-follow">
            <Link to={`/${user.username}/following`} id="user-following">
              <b>{user.following_count}</b> <span>Following</span>
            </Link>
            <Link to={`/${user.username}/followers`} id="user-follower">
              <b>{user.follower_count}</b> <span>Followers</span>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
