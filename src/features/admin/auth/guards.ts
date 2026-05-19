import { redirect } from 'next/navigation';

import { db } from '@/lib/db';

import { getAdminSession } from './session';

export const getCurrentAdminUser = async () => {
  const session = getAdminSession();

  if (!session) {
    return null;
  }

  const user = await db.adminUser.findFirst({
    where: {
      id: session.userId,
      isActive: true,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  return user;
};

export const requireAdminUser = async () => {
  const user = await getCurrentAdminUser();

  if (!user) {
    redirect('/admin/login');
  }

  return user;
};
