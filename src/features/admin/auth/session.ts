import type { AdminRole } from '@prisma/client';
import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

import { getRequiredServerEnv } from '@/lib/env';

const COOKIE_NAME = 'admin_session';
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

export type AdminSession = {
  userId: string;
  email: string;
  role: AdminRole;
  expiresAt: number;
};

const encodeBase64Url = (value: string) =>
  Buffer.from(value, 'utf8').toString('base64url');

const decodeBase64Url = (value: string) =>
  Buffer.from(value, 'base64url').toString('utf8');

const sign = (payload: string) =>
  createHmac('sha256', getRequiredServerEnv('ADMIN_SESSION_SECRET'))
    .update(payload)
    .digest('base64url');

const createCookieValue = (session: AdminSession) => {
  const payload = encodeBase64Url(JSON.stringify(session));
  const signature = sign(payload);

  return `${payload}.${signature}`;
};

const verifyCookieValue = (cookieValue: string): AdminSession | null => {
  const [payload, signature] = cookieValue.split('.');

  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = sign(payload);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    actualBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return null;
  }

  const session = JSON.parse(decodeBase64Url(payload)) as AdminSession;

  if (Date.now() > session.expiresAt) {
    return null;
  }

  return session;
};

export const createAdminSession = (input: Omit<AdminSession, 'expiresAt'>) => {
  const expiresAt = Date.now() + SESSION_DURATION_SECONDS * 1000;
  const session: AdminSession = {
    ...input,
    expiresAt,
  };

  cookies().set(COOKIE_NAME, createCookieValue(session), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_DURATION_SECONDS,
  });
};

export const getAdminSession = () => {
  const cookieValue = cookies().get(COOKIE_NAME)?.value;

  if (!cookieValue) {
    return null;
  }

  try {
    return verifyCookieValue(cookieValue);
  } catch {
    return null;
  }
};

export const clearAdminSession = () => {
  cookies().delete(COOKIE_NAME);
};
