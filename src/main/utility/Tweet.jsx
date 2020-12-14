import { useContext } from "react";
import { Link } from "react-router-dom";
import "./tweet.css";
import DropMenu from "../../utility/DropMenu";
import UserContext from "../../context/userContext";

export default function Tweet({ tweet, editTweetCb, editNewsCb }) {
  const { header } = useContext(UserContext);

  const handleHoverButton = (event) => {
    const hover_class = "news-tools-inactive";
    if (event.type === "mouseover") event.target.classList.remove(hover_class);
    else if (event.type === "mouseleave")
      event.target.classList.add(hover_class);
  };

  const handleClickLike = (event) => {
    event.target.style["pointer-events"] = "none";
    fetch(tweet.likes, {
      method: "PUT",
      headers: header,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((res) => {
        if (res)
          editTweetCb({
            ...tweet,
            is_liked: res.result,
            like_count: tweet.like_count + (res.result ? 1 : -1),
          });
        event.target.style["pointer-events"] = "auto";
      });
  };

  const handleClickRetweet = (event) => {
    event.target.style["pointer-events"] = "none";
    fetch(tweet.retweets, {
      method: "PUT",
      headers: header,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((res) => {
        if (res)
          editTweetCb({
            ...tweet,
            is_retweeted: res.result,
            retweet_count: tweet.retweet_count + (res.result ? 1 : -1),
          });
        event.target.style["pointer-events"] = "auto";
      });
  };

  const handleClickDelete = () => {
    fetch(`http://127.0.0.1:8000/news/${tweet.id}`, {
      method: "DELETE",
      headers: header,
    })
      .then((res) => res.ok)
      .then((res) => {
        if (res) editNewsCb(tweet.id);
      });
  };

  return (
    <div className="news tweet_box">
      <div className="news-pic-container">
        <div className="news-pic profile_pic">
          <img src={tweet.owner.picture} alt=""></img>
        </div>
      </div>

      <div className="news-area">
        <div className="news-area-header">
          <Link className="news-area-info" to={`/${tweet.owner.username}`}>
            <b className="news-header-name">{tweet.owner.full_name}</b>
            <span className="news-header-adr">@{tweet.owner.username}</span>
          </Link>
          <span className="news-header-time">&#183; {tweet.timestamp}</span>

          {tweet.owner.is_current && (
            <div className="news-header-owner">
              <DropMenu
                button={() => <i className="fas fa-ellipsis-h fa-fw" />}
                menu={() => (
                  <div className="drop_menu news-header-menu">
                    <div
                      className="news-header-menu-delete"
                      onClick={handleClickDelete}
                    >
                      Delete
                    </div>
                  </div>
                )}
              />
            </div>
          )}
        </div>

        <div className="news-area-description">{tweet.description}</div>

        <div
          className="news-area-pic default_pic"
          style={!tweet.picture ? { display: "none" } : {}}
        >
          <img
            className="back_pic"
            src={tweet.picture === null ? "" : tweet.picture}
            alt=""
          ></img>

          <img
            className="front_pic"
            src={tweet.picture === null ? "" : tweet.picture}
            alt=""
          ></img>
        </div>

        <div className="news-area-tools">
          <div
            className="news-tools-comment news-tools-inactive"
            onMouseOver={handleHoverButton}
            onMouseLeave={handleHoverButton}
          >
            <i className="far fa-comment fa-fw"></i>
            <span className="news-comment-count">{tweet.comment_count}</span>
          </div>

          <div
            className={
              "news-tools-retweet" +
              (tweet.is_retweeted
                ? " news-tools-active"
                : " news-tools-inactive")
            }
            onMouseOver={!tweet.owner.is_current ? handleHoverButton : null}
            onMouseLeave={!tweet.owner.is_current ? handleHoverButton : null}
            onClick={!tweet.owner.is_current ? handleClickRetweet : null}
            style={tweet.owner.is_current ? { pointerEvents: "none" } : null}
          >
            <i className="fas fa-retweet fa-fw"></i>
            <span className="news-retweet-count">{tweet.retweet_count}</span>
          </div>

          <div
            className={
              "news-tools-like" +
              (tweet.is_liked ? " news-tools-active" : " news-tools-inactive")
            }
            onMouseOver={handleHoverButton}
            onMouseLeave={handleHoverButton}
            onClick={handleClickLike}
          >
            <i className="far fa-heart fa-fw"></i>
            <span className="news-like-count">{tweet.like_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
