import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProfileList from './components/ProfileList';
import Map from './components/Map';
import AdminPanel from './components/AdminPanel';
import SearchBar from './components/SearchBar';
import ProfileDetails from './components/ProfileDetails';
import { ProfileProvider } from './contexts/ProfileContext';

function App() {
  const [selectedProfile, setSelectedProfile] = useState(null);

  return (
    <ProfileProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <nav className="bg-white dark:bg-gray-800 shadow-md p-4 sticky top-0 z-10">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Profile Map Explorer</h1>
              <Link to="/admin" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 ease-in-out">
                Admin Panel
              </Link>
            </div>
          </nav>
          <main className="container mx-auto px-4 py-8">
            <SearchBar />
            <Routes>
              <Route path="/" element={
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className={`w-full ${selectedProfile ? 'lg:w-2/3' : ''}`}>
                    <ProfileList onSelectProfile={setSelectedProfile} />
                  </div>
                  {selectedProfile && (
                    <div className="w-full lg:w-1/3 sticky top-20">
                      <Map selectedProfile={selectedProfile} />
                    </div>
                  )}
                </div>
              } />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/profile/:id" element={<ProfileDetails />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ProfileProvider>
  );
}

export default App;

