'use client';

import { fetchDetailEmployee } from '@/networks/employee';

import type { Book, Employee } from '@/types/book';
import type { APIResponse } from '@/types/response';
import { User2, UserToken } from '@/types/user';

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(_: SignUpParams): Promise<{ error?: string }> {
    // Make API request

    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;

    // Make API request

    // We do not handle the API, so we'll check if the credentials match with the hardcoded ones.
    if (email !== 'sofia@devias.io' || password !== 'Secret1') {
      return { error: 'Invalid credentials' };
    }

    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  jwtDecode(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  tokenExpired = (exp: number, onExpired: VoidFunction) => {
    // eslint-disable-next-line prefer-const
    let expiredTimer;

    const currentTime = Date.now();

    // Test token expires after 10s
    // const timeLeft = currentTime + 3000 - currentTime; // ~3s
    const timeLeft = exp * 1000 - currentTime;

    clearTimeout(expiredTimer);

    expiredTimer = setTimeout(() => {
      onExpired();
    }, timeLeft);
  };

  async getUser(): Promise<{ data?: UserToken | null }> {
    // Make API request

    // We do not handle the API, so just check if we have a token in localStorage.
    const token = localStorage.getItem('custom-auth-token');
    if (!token) {
      return { data: null };
    }
    const user = this.jwtDecode(token);
    if (!user.id) {
      return { data: null };
    }

    const promise: User2 = await fetchDetailEmployee({ data: user.id, token });

    return { data: promise };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');

    return {};
  }
}

export const authClient = new AuthClient();
