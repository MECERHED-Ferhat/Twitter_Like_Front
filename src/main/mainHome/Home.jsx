import { useContext, Fragment, useEffect } from "react";
import MainHeader from "../utility/MainHeader";
import AddTweet from "./AddTweet";
import Tweet from "../utility/Tweet";
import Separator from "../utility/Separator";
import useNews from "../utility/useNews";
import { LoadState, useLoadState, ERRORS } from "../../utility/LoadState";
import UserContext from "../../context/userContext";

export default function Home() {
  const { header } = useContext(UserContext);
  const [loadState, disLoadState] = useLoadState();
  const [news, disNews] = useNews();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/news/tweetHistory/", {
      headers: header,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((res) => {
        if (res)
          disNews({
            type: "init",
            news: res.results,
          });
        else
          disLoadState({
            type: "error",
            error: ERRORS.DEFAULT,
          });
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (news) disLoadState({ type: "render" });
    // eslint-disable-next-line
  }, [news]);

  return (
    <Fragment>
      <MainHeader>
        <div className="cwd-home">Home</div>
      </MainHeader>
      <AddTweet
        appendNewsCb={(item) => {
          if (news) disNews({ type: "append", item: item });
        }}
      />
      <LoadState loadState={loadState}>
        <div id="listNews">
          {news ? (
            news.map((tweet) => (
              <Fragment key={tweet.id}>
                <Tweet
                  tweet={tweet}
                  editTweetCb={(newTweet) =>
                    disNews({ type: "edit", item: newTweet })
                  }
                  editNewsCb={(id) => disNews({ type: "delete", id })}
                />
                <Separator />
              </Fragment>
            ))
          ) : (
            <Fragment />
          )}
        </div>
      </LoadState>
    </Fragment>
  );
}
