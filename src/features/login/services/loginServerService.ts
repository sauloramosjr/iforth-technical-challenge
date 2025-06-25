import { UserRepository } from '@/features/user/repository/UserRepository';
import { decriptPassword, generateToken } from '@/lib/auth';
import { UnauthorizedError } from '@/lib/exceptions/http/UnauthorizedError';

export const handleLogin = async (name: string, password: string) => {
  const user = await UserRepository.findOne({ name });

  const errorMessage = 'Usuário ou senha inválidos';
  if (!user) {
    throw new UnauthorizedError(errorMessage);
  }
  const isValidPassword = await decriptPassword(password, user.password);
  if (!isValidPassword) {
    throw new UnauthorizedError(errorMessage);
  }

  const token = await generateToken(user.id);
  const { password: _p, createdAt: _c, updatedAt: _u, ..._user } = user;

  return { ..._user, token };
};
