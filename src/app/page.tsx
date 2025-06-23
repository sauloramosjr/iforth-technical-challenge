import Image from 'next/image';
import { LoginForm } from '@/features/login/components/LoginForm';
import LoginErrorHandler from './_components/LoginErrorHandler';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div
      id="login"
      className="flex items-center justify-center w-screen h-screen"
    >
    <Suspense fallback={<></>}>
      <LoginErrorHandler />
    </Suspense>

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
