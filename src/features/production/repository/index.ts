import {
  TProduction,
  TProductionCreate,
  TProductionWithProduct,
} from '@/features/production/types/TProduction';
import { exceptions } from '@/lib/exceptions/exceptions';
import orm from '@/lib/orm';
import { Prisma } from '@/lib/orm/generated';
import { DefaultArgs } from '@/lib/orm/generated/runtime/library';

type TDefaultSearchParans = {
  where?: Prisma.ProductionEntryWhereInput;
  take?: number;
  skip?: number;
  orderBy?: Prisma.ProductionEntryOrderByWithRelationInput;
  select?: Prisma.ProductionEntrySelect;
};

const findOne = (args:Prisma.ProductionEntryFindUniqueArgs<DefaultArgs>): Promise<TProduction | null> => {
  return orm.productionEntry.findUnique(args);
};

const create = ({
  productId,
  quantityProduced,
  justification,
  userId,
}: TProductionCreate & { userId: string }): Promise<TProduction> => {
  return orm.productionEntry.create({
    data: {
      productId,
      quantityProduced,
      justification,
      createdById: userId,
      updatedById: userId,
    },
  });
};

const update = ({
  data,
  where,
}: {
  where: Prisma.ProductionEntryWhereUniqueInput;
  data: {
    status: TProduction['status'];
    updatedBy: TProduction['updatedById'];
  };
}): Promise<TProduction> => {
  if (data.updatedBy) {
    return orm.productionEntry.update({
      where,
      data: {
        status: data.status,
        updatedBy: { connect: { id: data.updatedBy } },
      },
    });
  }
  return orm.productionEntry.update({ where, data: data as any });
};

const count = (where?: Prisma.ProductionEntryWhereInput): Promise<number> => {
  return orm.productionEntry.count({ where });
};

const remove = (
  where: Prisma.ProductionEntryWhereUniqueInput
): Promise<TProduction> => {
  return orm.productionEntry.delete({ where });
};



const list = async ({
  skip,
  take,
  where,
  select,
  orderBy,
}: TDefaultSearchParans): Promise<any[]> => {
  try {
    return await orm.productionEntry.findMany({
      where,
      skip,
      take,
      orderBy,
      select,
    });
  } catch (error) {
    throw exceptions(error);
  }
};

export const ProductionRepository = {
  findOne,
  create,
  update,
  remove,
  list,
  count,
} as const;
