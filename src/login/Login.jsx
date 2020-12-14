import { useRef } from "react";

export default function Login({ onSubmitForm }) {
  const loginForm = useRef(null);

  return (
    <form
      id="login"
      name="login"
      ref={loginForm}
      onSubmit={(e) => onSubmitForm(e, loginForm.current)}
    >
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>

      <button>Login in</button>
    </form>
  );
}
