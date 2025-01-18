import React, { useState } from 'react';
import { useProfiles } from '../contexts/ProfileContext';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

function AdminPanel() {
  const { profiles, addProfile, deleteProfile, updateProfile } = useProfiles();
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    description: '',
    address: '',
    lat: '',
    lng: '',
  });
  const [editingProfile, setEditingProfile] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProfile) {
      updateProfile(editingProfile.id, formData); // Update the profile
    } else {
      addProfile(formData); // Add a new profile
    }
    setFormData({ name: '', photo: '', description: '', address: '', lat: '', lng: '' });
    setEditingProfile(null);
    navigate('/');
  };

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setFormData({
      name: profile.name,
      photo: profile.photo,
      description: profile.description,
      address: profile.address,
      lat: profile.lat,
      lng: profile.lng,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {editingProfile ? 'Edit Profile' : 'Admin Panel'}
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 placeholder-gray-800 dark:placeholder-gray-200"
            required
          />
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            placeholder="Photo URL"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 placeholder-gray-800 dark:placeholder-gray-200"
            required
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 placeholder-gray-800 dark:placeholder-gray-200"
            required
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 placeholder-gray-800 dark:placeholder-gray-200"
            required
          />
          <input
            type="number"
            name="lat"
            value={formData.lat}
            onChange={handleChange}
            placeholder="Latitude"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 placeholder-gray-800 dark:placeholder-gray-200"
            required
          />
          <input
            type="number"
            name="lng"
            value={formData.lng}
            onChange={handleChange}
            placeholder="Longitude"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 placeholder-gray-800 dark:placeholder-gray-200"
            required
          />
        </div>
        <button type="submit" className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 ease-in-out">
          {editingProfile ? 'Update Profile' : 'Add Profile'}
        </button>
      </form>
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Existing Profiles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {profiles.map(profile => (
            <div key={profile.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center">
              {/* Profile Image */}
              <div className="w-16 h-16 mr-6"> {/* Increased margin to provide more gap */}
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              {/* Profile Information */}
              <div className="flex-grow">
                <h4 className="font-bold text-gray-800 dark:text-gray-200">{profile.name}</h4>
                <p className="text-gray-600 dark:text-gray-400">{profile.description}</p>
                <div className="mt-2 flex space-x-4">
                  <button
                    onClick={() => handleEdit(profile)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200 ease-in-out"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => deleteProfile(profile.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200 ease-in-out"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
