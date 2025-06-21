import { TUser } from '@/types/TUser';

type TLogin = Pick<TUser, 'name'> & Pick<TUser, 'password'>;

export default TLogin;
