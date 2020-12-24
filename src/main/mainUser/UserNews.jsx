import React, { Fragment, useEffect } from "react";
import Tweet from "../utility/Tweet";
import Separator from "../utility/Separator";
import useNews from "../utility/useNews";
import { LoadState, useLoadState } from "../../utility/LoadState";
import axiosInstance from "../../utility/APIFetch";

export default function UserNews({ user }) {
  const [loadState, disLoadState] = useLoadState();
  const [news, disNews] = useNews();

  useEffect(() => {
    var isMounted = true;
    axiosInstance.get(user.tweet_url).then(({ data }) => {
      if (isMounted)
        disNews({
          type: "init",
          news: data ? data.results : null,
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
