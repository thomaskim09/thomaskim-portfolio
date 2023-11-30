import React, { createContext, useContext, useState, ReactNode } from 'react';

type Profile = 'RD' | 'AD'; // Define profile types

interface ProfileContextProps {
  selectedProfile: Profile;
  setProfile: (profile: Profile) => void;
}

interface ProfileProviderProps {
  children: ReactNode;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [selectedProfile, setSelectedProfile] = useState<Profile>('RD');

  const setProfile = (profile: Profile) => {
    setSelectedProfile(profile);
  };

  const value: ProfileContextProps = {
    selectedProfile,
    setProfile,
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export const useProfile = (): ProfileContextProps => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export default ProfileContext;
