import { useReducer } from "react";

export const initialNews = null;
const reducerNews = (state, action) => {
  // action = {type, news, item, id}
  // action.type = ["init", "clear"]
  switch (action.type) {
    case "init":
      return action.news;
    case "clear":
      return initialNews;
    case "append":
      return [action.item, ...state];
    case "edit":
      return state.map((tweet) =>
        tweet.id !== action.item.id ? tweet : action.item
      );
    case "delete":
      return state.filter((tweet) => tweet.id !== action.id);
    default:
      return state;
  }
};

export default function useNews() {
  return useReducer(reducerNews, initialNews);
}
