import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import chefIcon from '../images/chef.png'; // Import your icon here

function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    } else {
      return (
        names[0].charAt(0) + names[names.length - 1].charAt(0)
      ).toUpperCase();
    }
  };

  const userInitials = user ? getInitials(user.name) : "";

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="navbar">
      <div className="Nav-container">
        <div className="nav-branding">
          <img src={chefIcon} alt="Chef Hat Icon" className="chef-icon" /> {/* Display your icon */}
          Recipe<span className="hub">APP</span>
        </div>
        <div className={`nav-link-container ${isOpen ? "open" : ""}`}>
          <ul>
            <li className="nav-links">
              <Link to="/" className="navs" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li className="nav-links">
              <Link to="/discover" className="navs" onClick={toggleMenu}>
                Discover
              </Link>
            </li>
            <li className="nav-links">
              <Link to="/recipes" className="navs" onClick={toggleMenu}>
                Recipes
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-links" onClick={handleLogout}>
                  <Link className="login">{userInitials} Logout</Link>
                </li>
              </>
            ) : (
              <li className="nav-links">
                <Link to="/login" className="login" onClick={toggleMenu}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;























// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import "./Navbar.css";
// import chefIcon from '../images/chef.png'; // Import your icon here

// function Navbar() {
//   const [user, setUser] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     setUser(storedUser ? JSON.parse(storedUser) : null);
//   }, [location.pathname]);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const getInitials = (name) => {
//     if (!name) return "";
//     const names = name.split(" ");
//     if (names.length === 1) {
//       return names[0].substring(0, 2).toUpperCase();
//     } else {
//       return (
//         names[0].charAt(0) + names[names.length - 1].charAt(0)
//       ).toUpperCase();
//     }
//   };

//   const userInitials = user ? getInitials(user.name) : "";

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <div className="navbar">
//       <div className="Nav-container">
//         <div className="nav-branding">
//           <img src={chefIcon} alt="Chef Hat Icon" className="chef-icon" /> {/* Display your icon */}
//           Recipe<span className="hub">APP</span>
//         </div>
//         <div className={`nav-link-container ${isOpen ? "open" : ""}`}>
//           <ul>
//             <li className="nav-links">
//               <Link to="/" className="navs" onClick={toggleMenu}>
//                 Home
//               </Link>
//             </li>
//             <li className="nav-links">
//               <Link to="/discover" className="navs" onClick={toggleMenu}>
//                 Discover
//               </Link>
//             </li>
//             <li className="nav-links">
//               <Link to="/addyours" className="navs" onClick={toggleMenu}>
//                 Add Yours
//               </Link>
//             </li>
//             <li className="nav-links">
//               <Link to="/recipes" className="navs" onClick={toggleMenu}>
//                 Recipes
//               </Link>
//             </li>
//             {user ? (
//               <>
//                 <li className="nav-links" onClick={handleLogout}>
//                   <Link className="login">{userInitials} Logout</Link>
//                 </li>
//               </>
//             ) : (
//               <li className="nav-links">
//                 <Link to="/login" className="login" onClick={toggleMenu}>
//                   Login
//                 </Link>
//               </li>
//             )}
//           </ul>
//         </div>
//         <div className="hamburger" onClick={toggleMenu}>
//           <div className="bar"></div>
//           <div className="bar"></div>
//           <div className="bar"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;
