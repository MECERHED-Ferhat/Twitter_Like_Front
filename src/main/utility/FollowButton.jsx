import React from "react";
import "./follow_button.css";
import axiosInstance from "../../utility/APIFetch";

export default function FollowButton({ user, editUserCb }) {
  const handleHoverButton = (event) => {
    if (event.type === "mouseover") event.target.innerText = "Unfollow";
    else if (event.type === "mouseleave") event.target.innerText = "Following";
  };

  const handleClickFollow = (event) => {
    event.target.style["pointer-events"] = "none";
    event.stopPropagation();
    axiosInstance.put(user.follow_url).then(({ data }) => {
      if (data)
        editUserCb({
          ...user,
          is_following: data.result,
        });
      event.target.style["pointer-events"] = "auto";
    });
  };

  return (
    <button
      id="user-btn"
      className={!user.is_following ? "not_following" : ""}
      onMouseOver={user.is_following ? handleHoverButton : null}
      onMouseLeave={user.is_following ? handleHoverButton : null}
      onClick={handleClickFollow}
    >
      {user.is_following ? "Following" : "Follow"}
    </button>
  );
}
