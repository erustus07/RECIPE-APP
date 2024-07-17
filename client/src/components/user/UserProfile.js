import React from "react";
import { useAuth } from "../auth/AuthContext";
let userInitials
const UserProfile = () => {
  const { user } = useAuth();

  // Function to get initials from user's name
  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    } else {
      return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    }
  };

  // Calculate initials based on user's name
   userInitials = getInitials(user?.name || "");

  return (
    <div className="user-profile">
      <div className="user-avatar">{userInitials}</div>
      <div className="user-details">
        <h3>{user?.name}</h3>
        <p>Email: {user?.email}</p>
        {/* Add other user details as needed */}
      </div>
    </div>
  );
};

export { UserProfile, userInitials }; // Exporting userInitials correctly

export default UserProfile;
