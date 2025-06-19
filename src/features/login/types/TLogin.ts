import { User } from '@/lib/orm/generated';

type TLogin = Pick<User, 'name'> & Pick<User, 'password'>;

export default TLogin;
