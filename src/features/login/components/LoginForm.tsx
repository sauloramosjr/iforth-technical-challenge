'use client';

import { useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { useNotification } from '@/components/notifications/provider';
import { StorageKeys } from '@/enums/cookieskeys';
import { getErrorMessage } from '@/lib/httpClient/getErrorMessage';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { signIn } from '../services/loginUiService';
import TLogin from '../types/TLogin';
import InputDefault from '@/components/inputDefault';
import ButtonDefault, {
  buttonDefaultClassesBase,
} from '@/components/buttonDefault';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, touchedFields, isSubmitted },
  } = useForm<TLogin>();

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { notify } = useNotification();
  const onSubmit = useDebouncedCallback((data: TLogin) => {
    startTransition(async () => {
      try {
        const user = await signIn(data);
        localStorage.setItem(StorageKeys.AUTH_TOKEN,user.token)
        document.cookie = `${StorageKeys.AUTH_TOKEN}=${user.token};`;
        notify('Bem vindo: ' + user.name, 'success');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } catch (error) {
        notify(getErrorMessage(error), 'error');
      }
    });
  }, 300);

  useEffect(() => {
    const errs: string[] = [];
    Object.values(errors).forEach((error) => {
      if (error?.message) {

        errs.push(error.message as string);
      }
    });
     isSubmitted && errs.length > 0 && notify(errs.join('\n'), 'error');
  }, [errors, isSubmitted]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      autoComplete="on"
    >
      <div className="flex flex-col gap-0">
        <label>Nome</label>
        <InputDefault
          id={'inputName'}
          autoComplete="username"
          type="text"
          error={!!errors.name}
          {...register('name', { required: 'O nome é obrigatório' })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-0">
        <label>Senha</label>
        <InputDefault
          id={'inputPassword'}
          autoComplete="current-password"
          type="password"
          error={!!errors.password}
          {...register('password', { required: 'A senha é obrigatória' })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>

      <ButtonDefault
        className={buttonDefaultClassesBase + ' w-full'}
        type="submit"
        disabled={isPending}
      >
        {isPending ? 'Carregando...' : 'Entrar'}
      </ButtonDefault>
    </form>
  );
}
