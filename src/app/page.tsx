'use client';

import { useNotification } from '@/components/notifications/provider';
import { LoginForm } from '@/features/login/components/LoginForm';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function Home() {
  const searchParams = useSearchParams();
  const { notify } = useNotification();
  const router = useRouter();

  const handleParams = useDebouncedCallback(() => {
    const errorMessage = searchParams.get('errorMessage');
    if (errorMessage) {
      notify(errorMessage, 'error');
      router.push('/');
    }
  }, 300);

  useEffect(() => {
    handleParams();
  }, [searchParams]);

  return (
    <div
      id="login"
      className="flex items-center justify-center w-screen h-screen"
    >
      <div className="shadow-md p-10 flex flex-col items-center gap-5">
        <picture>
          <Image alt="logo" src={'/logo.svg'} width={100} height={100} />
        </picture>
        <h2 className="text-6xl">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
}
