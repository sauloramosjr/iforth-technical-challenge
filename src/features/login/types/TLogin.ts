import { TUser } from '@/features/user/types/TUser';

type TLogin = Pick<TUser, 'name'> & Pick<TUser, 'password'>;

export default TLogin;
