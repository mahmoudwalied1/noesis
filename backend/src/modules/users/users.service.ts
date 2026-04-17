import { prisma } from '../../lib/prisma';
import { AppError } from '../../lib/errors';

const safeUserSelect = {
  id: true,
  email: true,
  displayName: true,
  avatarUrl: true,
  bio: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
  roles: { select: { id: true, name: true } }
};

export async function listUsers(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;
  const [items, total] = await Promise.all([
    prisma.user.findMany({ skip, take: pageSize, orderBy: { createdAt: 'desc' }, select: safeUserSelect }),
    prisma.user.count()
  ]);

  return { items, page, pageSize, total };
}

export async function getUser(id: string) {
  const user = await prisma.user.findUnique({ where: { id }, select: safeUserSelect });
  if (!user) throw new AppError(404, 'USER_NOT_FOUND', 'User not found');
  return user;
}

export async function updateUser(id: string, input: { displayName?: string; isActive?: boolean }) {
  await getUser(id);
  return prisma.user.update({ where: { id }, data: input, select: safeUserSelect });
}

export async function updateUserRoles(id: string, roles: string[]) {
  await getUser(id);
  const roleRecords = await prisma.role.findMany({ where: { name: { in: roles } } });
  if (roleRecords.length !== roles.length) throw new AppError(400, 'INVALID_ROLES', 'One or more roles are invalid');

  return prisma.user.update({
    where: { id },
    data: { roles: { set: roleRecords.map((role) => ({ id: role.id })) } },
    select: safeUserSelect
  });
}
