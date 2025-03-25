
const API_BASE = 'http://localhost:8080';

export const loginRequest = async (username: string, password: string) => {
  return await fetch(`${API_BASE}/auth/accounts/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });
};


export const registerRequest = async (formData: {
  username: string;
  password: string;
  role: { roleId: number };
}) => {
  return await fetch(`${API_BASE}/auth/accounts/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
};

export const sessionInfo = async () => {
  return await fetch(`${API_BASE}/auth/accounts/sessionInfo`, {
    method: 'GET',
    credentials: 'include',
  });
};

export const logoutRequest = async () => {
  return await fetch(`${API_BASE}/auth/accounts/logout`, {
    method: 'GET',
    credentials: 'include',
  });
};
