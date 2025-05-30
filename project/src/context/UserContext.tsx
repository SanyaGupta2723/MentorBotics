import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile, Assessment } from '../types';

type UserContextType = {
  user: UserProfile | null;
  assessment: Assessment | null;
  setUser: (user: UserProfile | null) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setAssessment: (assessment: Assessment | null) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [assessment, setAssessment] = useState<Assessment | null>(null);

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const logout = () => {
    setUser(null);
    setAssessment(null);
  };

  return (
    <UserContext.Provider value={{ user, assessment, setUser, updateProfile, setAssessment, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}