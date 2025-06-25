import { TUser, TUserCreate } from '@/features/user/types/TUser';
import orm from '../../../lib/orm';
import { Prisma } from '../../../lib/orm/generated';

const findOne = (where: Prisma.UserWhereUniqueInput): Promise<TUser | null> => {
  return orm.user.findUnique({ where });
};

const findOneWithPermissions = (
  where: Prisma.UserWhereUniqueInput
): Promise<(TUser & { permissions: any[] }) | null> => {
  return orm.user.findUnique({
    where,
    include: {
      permissions: true,
    },
  });
};

const create = (data: TUserCreate): Promise<TUser> => {
  return orm.user.create({ data });
};

const update = (
  where: Prisma.UserWhereUniqueInput,
  data: Prisma.UserUpdateInput
): Promise<TUser> => {
  return orm.user.update({ where, data });
};

const remove = (where: Prisma.UserWhereUniqueInput): Promise<TUser> => {
  return orm.user.delete({ where });
};

const list = (where?: Prisma.UserWhereInput): Promise<TUser[]> => {
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
