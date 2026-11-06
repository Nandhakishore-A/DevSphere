import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/client.js';
import { disconnectSocket } from '../socket.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session via /api/auth/me (cookie and/or Authorization Bearer)
    api
      .get('/auth/me')
      .then(({ data }) => {
        setUser(data.user);
      })
      .catch(() => {
        try {
          localStorage.removeItem('devsphere_token');
        } catch {
          // ignore
        }
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    if (data.token) {
      try {
        localStorage.setItem('devsphere_token', data.token);
      } catch {
        // ignore
      }
    }
    setUser(data.user);
    return data.user;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    if (data.token) {
      try {
        localStorage.setItem('devsphere_token', data.token);
      } catch {
        // ignore
      }
    }
    setUser(data.user);
    return data.user;
  };

  const socialLogin = async (provider, email, name, avatar) => {
    const { data } = await api.post('/auth/social', { provider, email, name, avatar });
    if (data.token) {
      try {
        localStorage.setItem('devsphere_token', data.token);
      } catch {
        // ignore
      }
    }
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignore network errors during logout
    }
    try {
      localStorage.removeItem('devsphere_token');
    } catch {
      // ignore
    }
    disconnectSocket();
    setUser(null);
  };

  const updateProfile = async (updates) => {
    const { data } = await api.patch('/auth/profile', updates);
    setUser(data.user);
    return data.user;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        register,
        socialLogin,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
