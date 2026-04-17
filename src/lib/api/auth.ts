const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api/v1';

type Role = {
  id: string;
  name: string;
};

export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
  roles: Role[];
};

type AuthResponse = {
  user: AuthUser;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

type ApiErrorResponse = {
  error?: {
    message?: string;
  };
};

async function parseError(response: Response) {
  try {
    const body = (await response.json()) as ApiErrorResponse;
    return body.error?.message ?? 'Authentication failed';
  } catch {
    return 'Authentication failed';
  }
}

async function authRequest(path: '/auth/login' | '/auth/register', body: object) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return (await response.json()) as AuthResponse;
}

export function login(email: string, password: string) {
  return authRequest('/auth/login', { email, password });
}

export function register(displayName: string, email: string, password: string) {
  return authRequest('/auth/register', { displayName, email, password });
}

export function storeSession(auth: AuthResponse) {
  localStorage.setItem('accessToken', auth.tokens.accessToken);
  localStorage.setItem('refreshToken', auth.tokens.refreshToken);
  localStorage.setItem('user', JSON.stringify(auth.user));
}
