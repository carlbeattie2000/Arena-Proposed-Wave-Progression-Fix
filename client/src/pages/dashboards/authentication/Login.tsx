import { LoginProps } from "../../../types/authentication";

export default function Login({ setToken  }: LoginProps) {
  setToken("");
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
}
