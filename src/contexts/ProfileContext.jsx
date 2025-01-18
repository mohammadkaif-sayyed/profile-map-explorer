import React, { createContext, useState, useContext } from 'react';

const ProfileContext = createContext();

export const useProfiles = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState(() => {
    const savedProfiles = localStorage.getItem('profiles');
    return savedProfiles ? JSON.parse(savedProfiles) : [
      {
        id: 1,
        name: 'John Doe',
        photo: 'https://randomuser.me/api/portraits/men/1.jpg',
        description: 'Software Developer',
        address: '123 Tech St, San Francisco, CA 94105',
        lat: 37.7749,
        lng: -122.4194,
      },
      {
        id: 2,
        name: 'Jane Smith',
        photo: 'https://randomuser.me/api/portraits/women/2.jpg',
        description: 'UX Designer',
        address: '456 Design Ave, New York, NY 10001',
        lat: 40.7128,
        lng: -74.0060,
      },
      {
        id: 3,
        name: 'Alice Johnson',
        photo: 'https://randomuser.me/api/portraits/women/3.jpg',
        description: 'Data Scientist',
        address: '789 Data Ln, Boston, MA 02108',
        lat: 42.3601,
        lng: -71.0589,
      },
    ];
  });

  const [searchResults, setSearchResults] = useState(profiles);

  React.useEffect(() => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
    setSearchResults(profiles);
  }, [profiles]);

  const addProfile = (profile) => {
    const newProfile = { ...profile, id: Date.now() };
    setProfiles(prevProfiles => {
      const updatedProfiles = [...prevProfiles, newProfile];
      localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
      return updatedProfiles;
    });
  };

  const updateProfile = (id, updatedProfile) => {
    setProfiles(prevProfiles => {
      const updatedProfiles = prevProfiles.map(profile => 
        profile.id === id ? { ...profile, ...updatedProfile } : profile
      );
      localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
      return updatedProfiles;
    });
  };

  const deleteProfile = (id) => {
    setProfiles(prevProfiles => {
      const updatedProfiles = prevProfiles.filter(profile => profile.id !== id);
      localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
      return updatedProfiles;
    });
  };

  const searchProfiles = (searchTerm) => {
    const filteredProfiles = profiles.filter(profile =>
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredProfiles);
  };

  return (
    <ProfileContext.Provider value={{ profiles, searchResults, addProfile, updateProfile, deleteProfile, searchProfiles }}>
      {children}
    </ProfileContext.Provider>
  );
};

