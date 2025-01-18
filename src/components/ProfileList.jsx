import React from 'react';
import { useProfiles } from '../contexts/ProfileContext';
import ProfileCard from './ProfileCard';

function ProfileList({ onSelectProfile }) {
  const { searchResults } = useProfiles();

  if (!searchResults || searchResults.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl text-gray-600 dark:text-gray-400">No profiles found. Try a different search or add some from the Admin Panel!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {searchResults.map(profile => (
        <ProfileCard key={profile.id} profile={profile} onSelect={onSelectProfile} />
      ))}
    </div>
  );
}

export default ProfileList;

