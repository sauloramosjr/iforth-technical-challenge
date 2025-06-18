import { User } from '@/lib/prisma/generated';

type TLogin = Pick<User, 'name'> & Pick<User, 'password'>;

export default TLogin;
