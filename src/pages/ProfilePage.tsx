import React from 'react';
import { UserProfile, DietSettings } from '../components';

const ProfilePage: React.FC = () => {
  return (
    <div className="profile-page">
      <h1>Мой профиль</h1>
      <UserProfile />
      <DietSettings />
    </div>
  );
};

export default ProfilePage;