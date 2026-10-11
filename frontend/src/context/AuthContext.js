import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as Keychain from 'react-native-keychain';

const SESSION_SERVICE = 'com.wellnest.session';
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [restoreError, setRestoreError] = useState('');

  const restoreSession = useCallback(async () => {
    setIsLoading(true);
    setRestoreError('');
    try {
      const stored = await Keychain.getGenericPassword({ service: SESSION_SERVICE });
      if (stored) setSession(JSON.parse(stored.password));
    } catch (_error) {
      setRestoreError('Your saved session could not be opened. Try again or clear the saved session.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  const signIn = useCallback(async (nextSession) => {
    await Keychain.setGenericPassword('wellnest', JSON.stringify(nextSession), { service: SESSION_SERVICE });
    setSession(nextSession);
  }, []);

  const signOut = useCallback(async () => {
    await Keychain.resetGenericPassword({ service: SESSION_SERVICE });
    setSession(null);
  }, []);

  const value = useMemo(() => ({
    token: session?.accessToken || null,
    user: session?.user || null,
    isLoading,
    restoreError,
    restoreSession,
    signIn,
    signOut,
  }), [session, isLoading, restoreError, restoreSession, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider.');
  return context;
};
