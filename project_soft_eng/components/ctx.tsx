import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import { ip } from '../config'
import { router } from 'expo-router';
import axios from 'axios'

const AuthContext = createContext<{
  signUp: (email: string, username: string, password: string, confirm_password: string) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  session?: User | null;
  isLoading: boolean;
  setSession: (value: User | null) => void;
}>({
  signUp: () => null,
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  setSession: () => {},
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
  value={{
    signUp: async (email, username, password, confirm_password) => {
      const res = await axios.post('http://' + ip + ':8080/register', {
        email: email,
        username: username,
        password: password,
        confirm_password: confirm_password
      });

      setSession(res.data); // ตั้งค่า session ใหม่
      router.replace("/home");
    },
    signIn: async (email, password) => {
      console.log("login ctx");
      try {
        const res = await axios.post('http://' + ip + ':8080/login', {
          email: email,
          password: password
        });
        console.log("user data in session:", res.data);
        setSession(res.data); // ตั้งค่า session ใหม่
        router.replace("/home");
        console.log("pass");
      } catch (err) {
        console.log(err);
      }
    },
    signOut: () => {
      setSession(null); // ลบ session
      router.replace("/login");
    },
    session,
    isLoading,
    setSession,
     // เพิ่ม setSession ใน value
  }}
>
  {children}
</AuthContext.Provider>

  );
}

export interface User {
  id: string | null;
  updated_at: string | null; // เปลี่ยนเป็น string เนื่องจากข้อมูลที่ให้มาเป็น string
  username: string | null; // เพิ่มฟิลด์ username
  avatar_url: string | null; // เพิ่มฟิลด์ avatar_url
  name_bank: string | null; // เพิ่มฟิลด์ name_bank
  main_pocket: number | null; // เพิ่มฟิลด์ main_pocket
}

