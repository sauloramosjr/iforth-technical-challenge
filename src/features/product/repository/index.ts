import { TProduct, TProductCreate, TProductWithreatedBy } from '@/features/product/types/TProduct';
import orm from '@/lib/orm';
import { Prisma } from '@/lib/orm/generated';
import { DefaultArgs } from '@prisma/client/runtime/library';

const findOne = (args:Prisma.ProductFindUniqueArgs<DefaultArgs>): Promise<TProduct | null> => {
  return orm.product.findUnique(args);
};

const create = ({
  maxProduction,
  minProduction,
  name,
  userId,
}: TProductCreate & { userId: string }): Promise<TProduct> => {
  return orm.product.create({
    data: {
      maxProduction,
      minProduction,
      name,
      createdById: userId,
      updatedById: userId,
    },
  });
};

const update = ({
  data,
  where,
}: {
  where: Prisma.ProductWhereUniqueInput;
  data: { status: TProduct['status']; updatedBy: TProduct['updatedById'] };
}): Promise<TProduct> => {
  if (data.updatedBy) {
    return orm.product.update({
      where,
      data: {
        status: data.status,
        updatedBy: { connect: { id: data.updatedBy } },
      },
    });
  }
  return orm.product.update({ where, data: data as any });
};

const count = (where?: Prisma.ProductWhereInput): Promise<number> => {
  return orm.product.count({ where });
};
const remove = (where: Prisma.ProductWhereUniqueInput): Promise<TProduct> => {
  return orm.product.delete({ where });
};

const list = ({
  skip,
  take,
  where,
  orderBy,
  select,
}: {
  where?: Prisma.ProductWhereInput;
  take?: number;
  skip?: number;
  orderBy?: Prisma.ProductOrderByWithRelationInput;
  select?: Prisma.ProductSelect;
}): Promise<TProduct[]> => {
  return orm.product.findMany({
    where,
    skip,
    take,
    orderBy,
    select,
  });
};

export const ProductRepository = {
  findOne,
  create,
  update,
  remove,
  list,
  count,
} as const;
