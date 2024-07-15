import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider';

const UserProfile = () => {
  const { user } = useContext(AuthContext); // Assuming you have user data in AuthContext
  const initials = getInitials(user.name); // Function to get initials

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <p>Username: {user.name}</p>
        <p>Initials: {initials}</p>
      </div>
    </div>
  );
};

// Function to get initials from name
const getInitials = (name) => {
  const nameParts = name.split(' ');
  const initials = nameParts.map((part) => part.charAt(0)).join('').toUpperCase();
  return initials;
};

export default UserProfile;
