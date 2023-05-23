'use client';

import { signIn, signOut } from 'next-auth/react';

export const SignInButton = () => {
  return (
    <button onClick={async () => signIn()} className="text-blue-300">
      Login
    </button>
  );
};

export const SignOutButton = () => {
  return (
    <button onClick={async () => signOut()} className="text-blue-300">
      Logout
    </button>
  );
};
