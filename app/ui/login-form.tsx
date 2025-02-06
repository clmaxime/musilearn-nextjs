'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-6 p-8 max-w-lg mx-auto bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 shadow-2xl rounded-3xl">
      <div className="flex-1">
        <h1 className={`${lusitana.className} mb-6 text-4xl font-extrabold text-center text-white`}>
          Welcome back! Please log in to continue.
        </h1>

        <div className="space-y-5">
          <div>
            <label
              className="block text-sm font-medium text-white"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative mt-1">
              <input
                className="peer block w-full rounded-lg border border-purple-300 py-3 px-5 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-white"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                className="peer block w-full rounded-lg border border-purple-300 py-3 px-5 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>

        <input type="hidden" name="redirectTo" value={callbackUrl} />

        <Button className="mt-6 w-full py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 focus:ring-4 focus:ring-purple-500 transition-all duration-300" aria-disabled={isPending}>
          Log in
          <ArrowRightIcon className="ml-3 h-5 w-5 text-white" />
        </Button>

        <div className="flex items-center justify-center mt-4">
          {errorMessage && (
            <div className="flex items-center space-x-2 text-red-500">
              <ExclamationCircleIcon className="h-5 w-5" />
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
