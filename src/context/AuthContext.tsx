// src/context/AuthContext.tsx
import { createContext, useEffect, useState, ReactNode, JSX } from 'react';
import { getMyUserInfo } from '../services/user';
import { sessionInfo } from '../services/authservice';

interface Role {
  roleId: number;
}

interface Account {
  role?: Role;
}

interface User {
  idUser?: number;
  account?: Account;
  // Agrega más campos según tu backend si es necesario
}

interface AuthContextType {
  authStatus: 'checking' | 'authenticated' | 'not-authenticated';
  hasUserProfile: boolean;
  setHasUserProfile: (value: boolean) => void;
  role: number | null;
  accountId: number | null;
  login: () => Promise<void>;
  logout: () => void;
  user: User | null;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [authStatus, setAuthStatus] = useState<'checking' | 'authenticated' | 'not-authenticated'>('checking');
  const [hasUserProfile, setHasUserProfile] = useState<boolean>(false);
  const [accountId, setAccountId] = useState<number | null>(null);
  const [role, setRole] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const checkUserProfile = async () => {
    try {
      // const userRes = await fetch("http://localhost:8080/users/myInfo", {
      //   method: 'GET',
      //   credentials: 'include'
      // });

      const userRes = await getMyUserInfo();

      if (!userRes.ok) {
        setUser(null);
        setHasUserProfile(false);
        return;
      }

      const text = await userRes.text();

      try {
        const parsed: User = JSON.parse(text);
        setHasUserProfile(!!parsed.idUser);
        if (parsed.idUser) {
          setUser(parsed);
          setRole(parsed.account?.role?.roleId || null);
          setHasUserProfile(true);
        } else {
          setUser(null);
          setHasUserProfile(false);
        }
      } catch (err) {
        setUser(null);
        setHasUserProfile(false);
      }
    } catch (err) {
      setUser(null);
      console.error("Error al validar perfil:", err);
      setHasUserProfile(false);
    }
  };

  useEffect(() => {
    // fetch('http://localhost:8080/auth/accounts/sessionInfo', {
    //   method: 'GET',
    //   credentials: 'include'
    // })
      sessionInfo()
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setRole(data.account?.role?.roleId || null);
          setAccountId(data.accountId);
          setAuthStatus('authenticated');
          await checkUserProfile();
        } else {
          setAuthStatus('not-authenticated');
          setRole(null);
          setHasUserProfile(false);
        }
      })
      .catch(() => {
        setAuthStatus('not-authenticated');
        setRole(null);
        setHasUserProfile(false);
      });
  }, []);

  const login = async () => {
    // const res = await fetch("http://localhost:8080/auth/accounts/sessionInfo", {
    //   method: 'GET',
    //   credentials: 'include'
    // });
    const res = await sessionInfo();

    if (res.ok) {
      const data = await res.json();
      setRole(data.account?.role?.roleId || null);
      setAccountId(data.accountId);
      setAuthStatus('authenticated');
      await checkUserProfile();
    } else {
      setAccountId(null);
      setAuthStatus('not-authenticated');
      setRole(null);
      setHasUserProfile(false);
    }
  };

  const logout = () => {
    setAuthStatus('not-authenticated');
    setRole(null);
    setHasUserProfile(false);
    setAccountId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        hasUserProfile,
        setHasUserProfile,
        authStatus,
        role,
        accountId,
        login,
        logout,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
