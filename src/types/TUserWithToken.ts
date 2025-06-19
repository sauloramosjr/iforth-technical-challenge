import { User } from '@/lib/orm/generated';

type TUserWithToken = User & { token: string };

export default TUserWithToken
