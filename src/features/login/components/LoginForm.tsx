'use client';

import { useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import ButtonDefault from '@/components/buttonDefault';
import InputDefault from '@/components/inputDefault';

import { COOKIES_KEYS } from '@/lib/constants/cookieskeys';
import { BadRequestError } from '@/lib/exceptions/BadRequestError';
import { UnauthorizedError } from '@/lib/exceptions/UnauthorizedError';
import { signIn } from '../services/LoginUiService';
import TLogin from '../types/TLogin';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/components/notifications/provider';
import { useDebouncedCallback } from 'use-debounce';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TLogin>();

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { notify } = useNotification();
  const onSubmit = useDebouncedCallback((data: TLogin) => {
    startTransition(async () => {
      try {
        const user = await signIn(data);
        document.cookie = `${COOKIES_KEYS.AUTH_TOKEN}=${user.token};`;
        notify('Bem vindo: ' + user.name, 'success');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } catch (error) {
        if (error instanceof BadRequestError) {
          notify(error.message, 'error');
        }
        if (error instanceof UnauthorizedError) {
          notify(error.message, 'error');
        }
      }
    });
  },300);

  useEffect(() => {
    if (errors.name) {
      notify(errors.name?.message + '', 'error');
    }
  }, [errors.name]);

  useEffect(() => {
    if (errors.password) {
      notify(errors.password?.message + '', 'error');
    }
  }, [errors.password]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="on">
      <div>
        <label>Nome</label>
        <InputDefault
        id={'inputName'}
        autoComplete="username"
        type='text'
        
        className={errors.name && 'border-red-500'}
        {...register('name', { required: 'O nome é obrigatório' })}
        />
        {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>

      <div>
        <label>Senha</label>
        <InputDefault
        id={'inputPassword'}
        autoComplete="current-password"
        type='password'
          className={errors.password && 'border-red-500'}
          {...register('password', { required: 'A senha é obrigatória' })}
          />
        {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>

      <ButtonDefault type="submit" disabled={isPending}>
        {isPending ? 'Carregando...' : 'Entrar'}
      </ButtonDefault>
    </form>
  );
}
