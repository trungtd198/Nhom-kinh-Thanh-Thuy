'use server';

import { redirect } from 'next/navigation';

import { verifyPassword } from '@/features/admin/auth/password';
import { createAdminSession } from '@/features/admin/auth/session';
import { db } from '@/lib/db';

const LOGIN_ERROR_PATH = '/admin/login?error=invalid';
const LOGIN_LOCKED_PATH = '/admin/login?error=locked';
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_LOCK_DURATION_MS = 15 * 60 * 1000;

type LoginAttempt = {
  count: number;
  lockedUntil: number;
};

const globalForLoginAttempts = globalThis as unknown as {
  adminLoginAttempts?: Map<string, LoginAttempt>;
};

const loginAttempts =
  globalForLoginAttempts.adminLoginAttempts ?? new Map<string, LoginAttempt>();

globalForLoginAttempts.adminLoginAttempts = loginAttempts;

const getAttemptKey = (email: string) => email || 'unknown';

const isLoginLocked = (email: string) => {
  const attempt = loginAttempts.get(getAttemptKey(email));

  return Boolean(attempt && attempt.lockedUntil > Date.now());
};

const recordFailedLogin = (email: string) => {
  const attemptKey = getAttemptKey(email);
  const currentAttempt = loginAttempts.get(attemptKey);
  const count = (currentAttempt?.count ?? 0) + 1;

  loginAttempts.set(attemptKey, {
    count,
    lockedUntil:
      count >= MAX_LOGIN_ATTEMPTS ? Date.now() + LOGIN_LOCK_DURATION_MS : 0,
  });
};

const clearFailedLogins = (email: string) => {
  loginAttempts.delete(getAttemptKey(email));
};

export const loginAdmin = async (formData: FormData) => {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase();
  const password = String(formData.get('password') ?? '');

  if (!email || !password) {
    redirect(LOGIN_ERROR_PATH);
  }

  if (isLoginLocked(email)) {
    redirect(LOGIN_LOCKED_PATH);
  }

  const adminUser = await db.adminUser.findUnique({
    where: {
      email,
    },
  });

  if (!adminUser || !adminUser.isActive) {
    recordFailedLogin(email);
    redirect(LOGIN_ERROR_PATH);
  }

  const passwordMatches = await verifyPassword(
    password,
    adminUser.passwordHash,
  );

  if (!passwordMatches) {
    recordFailedLogin(email);
    redirect(LOGIN_ERROR_PATH);
  }

  clearFailedLogins(email);

  await db.adminUser.update({
    where: {
      id: adminUser.id,
    },
    data: {
      lastLoginAt: new Date(),
    },
  });

  createAdminSession({
    userId: adminUser.id,
    email: adminUser.email,
    role: adminUser.role,
  });

  redirect('/admin');
};
