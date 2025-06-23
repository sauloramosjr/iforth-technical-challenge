'use client';

import { useNotification } from '@/components/notifications/provider';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const LoginErrorHandler = () => {
  const searchParams = useSearchParams();
  const { notify } = useNotification();

  const handleParams = useDebouncedCallback(() => {
    const errorMessage = searchParams.get('errorMessage');
    if (errorMessage) {
      notify(errorMessage, 'error');
    }
  }, 300);

  useEffect(() => {
    handleParams();
  }, [searchParams, handleParams]);

  return null;
};

export default LoginErrorHandler;
