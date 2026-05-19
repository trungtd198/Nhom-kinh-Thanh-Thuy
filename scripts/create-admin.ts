/* eslint-disable no-console */
import { AdminRole, PrismaClient } from '@prisma/client';

import { createPasswordHash } from '../src/features/admin/auth/password';

const prisma = new PrismaClient();

const getArgValue = (name: string) => {
  const prefix = `--${name}=`;
  const arg = process.argv.find((item) => item.startsWith(prefix));

  return arg?.slice(prefix.length);
};

const getInput = (name: string, envName: string) =>
  getArgValue(name) ?? process.env[envName];

const main = async () => {
  const email = getInput('email', 'ADMIN_EMAIL')?.trim().toLowerCase();
  const name = getInput('name', 'ADMIN_NAME')?.trim() ?? 'Admin';
  const password = getInput('password', 'ADMIN_PASSWORD');
  const roleInput = getInput('role', 'ADMIN_ROLE') ?? AdminRole.ADMIN;

  if (!email || !password) {
    throw new Error(
      'Missing admin credentials. Use --email= --password= or ADMIN_EMAIL/ADMIN_PASSWORD.',
    );
  }

  if (!Object.values(AdminRole).includes(roleInput as AdminRole)) {
    throw new Error(`Invalid role. Use one of: ${Object.values(AdminRole)}`);
  }

  const passwordHash = await createPasswordHash(password);
  const adminUser = await prisma.adminUser.upsert({
    where: {
      email,
    },
    create: {
      email,
      name,
      passwordHash,
      role: roleInput as AdminRole,
      isActive: true,
    },
    update: {
      name,
      passwordHash,
      role: roleInput as AdminRole,
      isActive: true,
    },
  });

  console.log(`Admin user ready: ${adminUser.email}`);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
