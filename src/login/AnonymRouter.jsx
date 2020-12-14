import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../context/userContext";

export default function AnonymRouter({ children, ...rest }) {
  const { isLog } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isLog ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
