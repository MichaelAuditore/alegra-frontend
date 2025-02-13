import LoginForm from '@/app/ui/login-form';
import { authOptions } from '@/auth.config';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/restaurant");

  return (
    <div className="grid gap-6 p-6 auto-rows-auto">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}