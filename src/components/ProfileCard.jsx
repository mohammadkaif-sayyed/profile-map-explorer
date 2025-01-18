import React from 'react';
import { Link } from 'react-router-dom';

function ProfileCard({ profile, onSelect }) {
  if (!profile) {
    return null;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center p-6 border border-gray-200 dark:border-gray-600 relative">
      {/* Circular Profile Image */}
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-600 shadow-md">
        <img
          src={profile.photo || "/placeholder.svg"}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="mt-4 text-center flex flex-col items-center mb-12">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          {profile.name}
        </h2>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
          {profile.description}
        </p>
      </div>

      {/* Fixed Position for Map and Details Icons */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
        {/* Map Icon */}
        <button
          onClick={() => onSelect(profile)}
          className="flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-200 ease-in-out"
          title="Show on Map"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 20l-5.447-2.723A2 2 0 013 15.382V6.618a2 2 0 011.553-1.953L9 2m0 18l6-3m-6 3V2m6 18l5.447-2.723A2 2 0 0021 15.382V6.618a2 2 0 00-1.553-1.953L15 2m0 18V2m0 0L9 5m6-3l5.447 2.723M9 5L3.553 7.277"
            />
          </svg>
        </button>

        {/* Arrow Icon */}
        <Link
          to={`/profile/${profile.id}`}
          className="flex items-center text-green-500 hover:text-green-600 transition-colors duration-200 ease-in-out"
          title="View Details"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default ProfileCard;
