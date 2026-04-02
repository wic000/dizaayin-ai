import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

import { ADMIN_TELEGRAM_IDS, SESSION_COOKIE } from "@/lib/constants";

type SessionPayload = {
  userId: string;
  telegramId: string;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  language: string;
  role: "USER" | "ADMIN";
};

const secret = new TextEncoder().encode(process.env.SESSION_SECRET || "development-session-secret-change-me");

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);
}

export async function setSessionCookie(payload: SessionPayload) {
  const token = await createSessionToken(payload);

  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  });
}

export function clearSessionCookie() {
  cookies().delete(SESSION_COOKIE);
}

export async function getSession() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function requireSession() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function requireAdminSession() {
  const session = await requireSession();
  const isAdmin = session.role === "ADMIN" || ADMIN_TELEGRAM_IDS.includes(session.telegramId);

  if (!isAdmin) {
    throw new Error("Forbidden");
  }

  return {
    ...session,
    role: "ADMIN" as const
  };
}
