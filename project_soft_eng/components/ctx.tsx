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
}>({
  signUp: () => null,
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
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
          })

          setSession(res.data.user);
          router.replace("/home");
        },
        signIn: async (email, password) => {
          console.log("login ctx")
          try{
            const res = await axios.post('http://' + ip + ':8080/login', {
              email: email,
              password: password
            });
          console.log("res!",res.data.user);
          setSession(res.data);
          router.replace("/home");
          console.log("pass")
          }catch(err){
            console.log(err);
          }
          

          
        },
        signOut: () => {
          setSession(null);
          router.replace("/login");
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export interface User {
  id:                 string | null;
  aud:                string | null;
  role:               string | null;
  email:              string | null;
  email_confirmed_at: Date | null;
  phone:              string | null;
  confirmed_at:       Date | null;
  last_sign_in_at:    Date | null;
  app_metadata:       AppMetadata | null;
  user_metadata:      UserMetadata | null;
  identities:         any[] | null;
  created_at:         Date | null;
  updated_at:         Date | null;
  is_anonymous:       boolean | null;
}

interface AppMetadata {
  provider:  string | null;
  providers: any[] | null;
}

interface UserMetadata {
  email:          string | null;
  email_verified: boolean | null;
  phone_verified: boolean | null;
  sub:            string | null;
  username:       string | null;
}
