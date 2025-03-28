// src/context/AuthContext.tsx
import { createContext, useEffect, useState, ReactNode, JSX } from 'react';
import { getMyUserInfo } from '../services/user';
import { sessionInfo } from '../services/authservice';
import { Address } from '../models/Address';
import { User } from '../models/User';
import { Role } from '../models/Role';

// interface Role {
//   roleId: number;
//   roleName: string;
// }

// interface Account {
//   role?: Role;
// }

// interface User {
//   idUser?: number;
//   account?: Account;
//   firstName?: string;
//   address?: Address;
// }

interface AuthContextType {
  authStatus: 'checking' | 'authenticated' | 'not-authenticated';
  hasUserProfile: boolean;
  setHasUserProfile: (value: boolean) => void;
  role: Role | null;
  accountId: number | null;
  login: () => Promise<void>;
  logout: () => void;
  user: User | null;
  address: Address | null;
  setAddress: (value: Address) => void;
  hasAddress: boolean;
  setHasAddress: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [authStatus, setAuthStatus] = useState<'checking' | 'authenticated' | 'not-authenticated'>('checking');
  const [hasUserProfile, setHasUserProfile] = useState<boolean>(false);
  const [accountId, setAccountId] = useState<number | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [address, setAddress] = useState<Address | null> (null);
  const [hasAddress, setHasAddress] = useState<boolean>(false);


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
        setHasAddress(false);
        return;
      }

      const text = await userRes.text();

      try {
        const parsed: User = JSON.parse(text);
        setHasUserProfile(!!parsed.idUser);
        if (parsed.idUser) {
          setUser(parsed);
          setRole(parsed.account?.role || null);
          setHasUserProfile(true);

          if(parsed.address?.addressId){
            setAddress(parsed.address);
            setHasAddress(true);
          } else{
            setHasAddress(false);
          }

        } else {
          setUser(null);
          setAddress(null);
          setHasUserProfile(false);
        }

      } catch (err) {
        setUser(null);
        setAddress(null);
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
          setRole(data.account?.role || null);
          setAccountId(data.accountId);
          setAuthStatus('authenticated');
          await checkUserProfile();
        } else {
          setAuthStatus('not-authenticated');
          setRole(null);
          setHasUserProfile(false);
          setHasAddress(false);
        }
      })
      .catch(() => {
        setAuthStatus('not-authenticated');
        setRole(null);
        setHasUserProfile(false);
        setHasAddress(false);
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
    setHasAddress(false);
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
        user,
        address,
        setAddress,
        hasAddress,
        setHasAddress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
