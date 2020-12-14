import { Fragment, useEffect, useContext } from "react";
import Tweet from "../utility/Tweet";
import Separator from "../utility/Separator";
import useNews from "../utility/useNews";
import { LoadState, useLoadState } from "../../utility/LoadState";
import UserContext from "../../context/userContext";

export default function UserNews({ user }) {
  const { header } = useContext(UserContext);
  const [loadState, disLoadState] = useLoadState();
  const [news, disNews] = useNews();

  useEffect(() => {
    var isMounted = true;
    fetch(user.tweet_url, {
      headers: header,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((res) => {
        if (isMounted)
          disNews({
            type: "init",
            news: res ? res.results : null,
          });
      });
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (news) disLoadState({ type: "render" });
    // eslint-disable-next-line
  }, [news]);

  return (
    <LoadState loadState={loadState}>
      <div id="listUserNews">
        {news &&
          news.map((tweet) => (
            <Fragment key={tweet.id}>
              <Separator />
              <Tweet
                tweet={tweet}
                editTweetCb={(newTweet) =>
                  disNews({
                    type: "edit",
                    item: newTweet,
                  })
                }
                editNewsCb={(id) =>
                  disNews({
                    type: "delete",
                    id,
                  })
                }
              />
            </Fragment>
          ))}
      </div>
    </LoadState>
  );
}
