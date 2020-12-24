import React, { useReducer } from "react";
import { ErrorDefault, Error404 } from "../error/Error";

export const ERRORS = {
  E404: 0,
};

const initialValue = {
  isLoading: true,
  hasFailed: false,
  error: null,
};
const reducer = (state, action) => {
  // action = {type, error}
  // action.type = ["loading", "error", "render"]
  switch (action.type) {
    case "loading":
      return initialValue;
    case "error":
      return {
        isLoading: false,
        hasFailed: true,
        error: action.error,
      };
    case "render":
      return {
        isLoading: false,
        hasFailed: false,
        error: null,
      };
    default:
      return state;
  }
};

export function useLoadState() {
  return useReducer(reducer, initialValue);
}

export function LoadState({ children, loadState }) {
  const { isLoading, hasFailed, error } = loadState;

  if (isLoading) return <div className="loading_spinner" />;

  if (hasFailed)
    switch (error) {
      case ERRORS.E404:
        return <Error404 />;
      default:
        return <ErrorDefault />;
    }

  return children;
}
