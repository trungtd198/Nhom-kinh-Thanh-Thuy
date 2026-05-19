import { redirect } from 'next/navigation';

import { clearAdminSession } from '@/features/admin/auth/session';

export const GET = () => {
  clearAdminSession();
  redirect('/admin/login');
};
