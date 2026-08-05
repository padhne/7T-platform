'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const validUsername = process.env.DASHBOARD_USERNAME;
  const validPassword = process.env.DASHBOARD_PASSWORD;

  if (!validUsername || !validPassword) {
    return { error: 'Server authentication is not configured properly.' };
  }

  if (username === validUsername && password === validPassword) {
    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('dashboard_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    // Redirect to dashboard
    redirect('/dashboard');
  } else {
    return { error: 'Invalid username or password.' };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('dashboard_session');
  redirect('/login');
}
