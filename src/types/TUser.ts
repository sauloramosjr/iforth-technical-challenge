import { User } from '@/lib/orm/generated';

export type TUser = User

export type TUserWithToken = TUser & { token: string };

export type TUserCreate = Pick<TUser, 'name'> & Pick<TUser, 'password'>;

