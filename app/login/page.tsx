import { LoginForm } from "../ui/login-form";

import { title } from "@/components/primitives";

export default function LoginPage() {
  return (
    <div>
      <h1 className={title()}>Login</h1>
      <LoginForm />
    </div>
  );
}
