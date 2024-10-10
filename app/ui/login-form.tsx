"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

import { useUser } from "@/app/context/user-context";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Must be at least 6 characters long"),
});

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string[] | undefined;
    password?: string[] | undefined;
  }>();
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { login } = useUser();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);

      return;
    }

    setErrors(undefined);
    setMessage("");

    const response = await fetch("/api/auth/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      login(await response.json());
      router.replace("/");
    } else {
      setMessage((await response.json()).error);
    }
  }

  return (
    <form className="flex flex-col gap-4 py-8" onSubmit={handleSubmit}>
      <Input
        required
        errorMessage={errors?.email}
        isInvalid={!!errors?.email}
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        required
        errorMessage={errors?.password}
        isInvalid={!!errors?.password}
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <p aria-live="polite">{message}</p>
      <Button type="submit">Log In</Button>
    </form>
  );
}
