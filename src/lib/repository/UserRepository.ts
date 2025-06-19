// src/lib/repositories/UserRepository.ts

import TUserCreate from '@/types/TUserCreate';
import orm from '../orm';
import { Prisma, User } from '../orm/generated';

const findOne = (where: Prisma.UserWhereUniqueInput): Promise<User | null> => {
  return orm.user.findUnique({ where });
};

const findOneWithPermissions = (
  where: Prisma.UserWhereUniqueInput
): Promise<(User & { permissions: any[] }) | null> => {
  return orm.user.findUnique({
    where,
    include: {
      permissions: true,
    },
  });
};

const create = (data: TUserCreate): Promise<User> => {
  return orm.user.create({ data });
};

const update = (
  where: Prisma.UserWhereUniqueInput,
  data: Prisma.UserUpdateInput
): Promise<User> => {
  return orm.user.update({ where, data });
};

const remove = (where: Prisma.UserWhereUniqueInput): Promise<User> => {
  return orm.user.delete({ where });
};

const list = (where?: Prisma.UserWhereInput): Promise<User[]> => {
  return orm.user.findMany({ where });
};

export const UserRepository = {
  findOne,
  findOneWithPermissions,
  create,
  update,
  remove,
  list,
} as const;
