"use server";
import { cookies } from "next/headers";
import { execute } from "~/graphql/execute";
import { LOGIN_MUTATION } from "../graphql/mutations";

const TOKEN_COOKIE_NAME = "jwtToken";

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE_NAME);
};

export const login = async (email: string, password: string) => {
  const result = await execute(LOGIN_MUTATION, { email, password });

  const { token, ...userData } = result.login;
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return userData;
};
