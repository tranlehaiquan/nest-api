"use server";
import { cookies } from "next/headers";
import { execute } from "~/graphql/execute";
import { LOGIN_MUTATION, REGISTER_MUTATION } from "../graphql/mutations";

const TOKEN_COOKIE_NAME = "jwt-token";

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE_NAME);
};

export const login = async (email: string, password: string) => {
  const cookieStore = await cookies();
  const [data, errors] = await execute(LOGIN_MUTATION, { email, password });

  if (errors) {
    throw new Error("Login failed");
  }

  const { token, ...userData } = data.login;
  cookieStore.set(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return userData;
};

export const register = async (username: string, email: string, password: string) => {
  const [data, errors] = await execute(REGISTER_MUTATION, { username, email, password });

  if (errors) {
    throw new Error("Registration failed");
  }

  return data.register;
};