import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProfiles } from '../contexts/ProfileContext';
import Map from './Map';

function ProfileDetails() {
  const { id } = useParams();
  const { profiles } = useProfiles();
  const profile = profiles.find(p => p.id === parseInt(id));

  if (!profile) {
    return <div className="text-center py-8 text-xl text-gray-800 dark:text-gray-200">Profile not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to profiles</Link>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Profile Information Section */}
          <div className="md:w-1/3 p-6">
            <img
              src={profile.photo || "/placeholder.svg"}
              alt={profile.name}
              className="w-48 h-48 object-cover rounded-full mx-auto mb-4"  // Large circular image
            />
            <h2 className="text-2xl font-bold text-center mb-2 text-gray-800 dark:text-gray-200">{profile.name}</h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Contact Information</h3>
              <p className="text-gray-800 dark:text-gray-200">Email: {profile.email || `${profile.name.toLowerCase().replace(' ', '.')}@example.com`}</p>
              <p className="text-gray-800 dark:text-gray-200">Phone: {profile.phone || '(555) 123-4567'}</p>
            </div>

            {/* Removed Profile Description here */}

            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Skills</h3>
              <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
                {profile.skills ? profile.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                )) : (
                  <>
                    <li>Skill 1</li>
                    <li>Skill 2</li>
                    <li>Skill 3</li>
                  </>
                )}
              </ul>
            </div>

            {/* Added gap before About */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">About {profile.name}</h3>
              <p className="text-gray-800 dark:text-gray-200">
                {profile.about || `${profile.name} is a ${profile.description} with extensive experience in their field. They are known for their expertise and dedication to their work.`}
              </p>
            </div>
          </div>

          {/* Profile Location and Map Section */}
          <div className="md:w-2/3 p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Location</h3>
            <p className="text-gray-800 dark:text-gray-200 mb-4">{profile.address}</p>
            <div className="h-[400px] mb-4">  {/* Fixed height for map */}
              <Map selectedProfile={profile} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
