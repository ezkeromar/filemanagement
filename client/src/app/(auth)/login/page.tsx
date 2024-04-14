"use client";
import { redirect } from "next/navigation";
import { LoginForm } from "./components/LoginForm";

export default async function LoginPage() {

  return <LoginForm />;
}
