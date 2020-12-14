import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../context/userContext";

export default function ProtectedRouter({ children, ...rest }) {
  const { isLog } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isLog ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
}
