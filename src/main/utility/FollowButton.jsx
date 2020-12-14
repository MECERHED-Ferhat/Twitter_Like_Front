import { useContext } from "react";
import "./follow_button.css";
import UserContext from "../../context/userContext";

export default function FollowButton({ user, editUserCb }) {
  const { header } = useContext(UserContext);

  const handleHoverButton = (event) => {
    if (event.type === "mouseover") event.target.innerText = "Unfollow";
    else if (event.type === "mouseleave") event.target.innerText = "Following";
  };

  const handleClickFollow = (event) => {
    event.target.style["pointer-events"] = "none";
    event.stopPropagation();
    fetch(user.follow_url, {
      method: "PUT",
      headers: header,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((res) => {
        if (res)
          editUserCb({
            ...user,
            is_following: res.result,
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
