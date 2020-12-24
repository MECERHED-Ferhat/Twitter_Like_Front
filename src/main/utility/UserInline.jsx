import React, { useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import "./user_inline.css";

export default function UserInline({ user, children }) {
  const [redirect, setRedirect] = useState(false);

  return (
    <div className="userline tweet_box" onClick={() => setRedirect(true)}>
      {redirect ? <Redirect push to={`/${user.username}`} /> : <Fragment />}
      <div>
        <div className="userline-pic profile_pic">
          <img src={user.picture} alt="" />
        </div>
      </div>
      <div className="userline-container">
        <div className="userline-info-container">
          <div className="userline-info">
            <span className="userline-name">{user.full_name}</span>
            <span className="userline-adr">@{user.username}</span>
          </div>
        </div>

        {children ? children : <Fragment />}
      </div>
    </div>
  );
}
