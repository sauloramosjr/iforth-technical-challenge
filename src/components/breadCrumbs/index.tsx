'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();

  const pathNames = pathname.split('/').filter((x) => x);

  return (
    <nav className="text-sm text-gray-600 mb-4 ml-10 md:ml-0">
      <ol className="flex space-x-2">
     

        {pathNames.map((name, index) => {
          const routeTo = '/' + pathNames.slice(0, index + 1).join('/');

          const isLast = index === pathNames.length - 1;
          const label = decodeURIComponent(name);

          return (
            <li key={routeTo}>
              {!isLast ? (
                <>
                  <Link href={routeTo} className="hover:underline capitalize">
                    {label}
                  </Link>
                  <span className="mx-2">/</span>
                </>
              ) : (
                <span className="capitalize">{label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
