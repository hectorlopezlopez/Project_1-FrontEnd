
const API_BASE = 'http://localhost:8080';

export const createUserProfile = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  phone: string;
  account: { accountId: number | null };
}) => {
  return await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
};

export const getMyUserInfo = async () => {
  return await fetch(`${API_BASE}/users/myInfo`, {
    method: 'GET',
    credentials: 'include',
  });
};
