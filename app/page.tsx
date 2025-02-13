import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <div className="grid gap-6 p-6 auto-rows-auto">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}