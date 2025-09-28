// // import React from "react";
// // import { Link, useLocation } from "react-router-dom";
// // import { useAuth } from "../../context/AuthContext";

// // const Navbar = () => {
// //   const { user, logout } = useAuth();
// //   const location = useLocation();

// //   const handleLogout = () => {
// //     logout();
// //   };

// //   return (
// //     <nav className="bg-white shadow-sm border-b">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex justify-between h-16">
// //           <div className="flex items-center">
// //             <Link to="/" className="flex items-center space-x-2">
// //               <div className="w-8 h-8 bg-green-500 rounded-full"></div>
// //               <span className="font-bold text-xl text-gray-900">
// //                 GreenTrack
// //               </span>
// //             </Link>
// //           </div>

// //           <div className="flex items-center space-x-4">
// //             {user ? (
// //               <>
// //                 <Link
// //                   to="/dashboard"
// //                   className={`px-3 py-2 rounded-md text-sm font-medium ${
// //                     location.pathname === "/dashboard"
// //                       ? "text-green-600 bg-green-50"
// //                       : "text-gray-700 hover:text-green-600"
// //                   }`}
// //                 >
// //                   Dashboard
// //                 </Link>
// //                 <span className="text-gray-700">
// //                   Hello, {user.profile.name}
// //                 </span>
// //                 <button
// //                   onClick={handleLogout}
// //                   className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600"
// //                 >
// //                   Logout
// //                 </button>
// //               </>
// //             ) : (
// //               <>
// //                 <Link
// //                   to="/login"
// //                   className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600"
// //                 >
// //                   Login
// //                 </Link>
// //                 <Link
// //                   to="/register"
// //                   className="px-4 py-2 rounded-md text-sm font-medium text-white bg-green-500 hover:bg-green-600"
// //                 >
// //                   Sign Up
// //                 </Link>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;

// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const location = useLocation();

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <nav className="bg-white shadow-sm border-b">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-green-500 rounded-full"></div>
//               <span className="font-bold text-xl text-gray-900">
//                 GreenTrack
//               </span>
//             </Link>
//           </div>

//           <div className="flex items-center space-x-4">
//             {user ? (
//               <>
//                 <Link
//                   to="/dashboard"
//                   className={`px-3 py-2 rounded-md text-sm font-medium ${
//                     location.pathname === "/dashboard"
//                       ? "text-green-600 bg-green-50"
//                       : "text-gray-700 hover:text-green-600"
//                   }`}
//                 >
//                   Dashboard
//                 </Link>

//                 {/* Add Profile Link */}
//                 <Link
//                   to="/profile"
//                   className={`px-3 py-2 rounded-md text-sm font-medium ${
//                     location.pathname === "/profile"
//                       ? "text-green-600 bg-green-50"
//                       : "text-gray-700 hover:text-green-600"
//                   }`}
//                 >
//                   Profile
//                 </Link>

//                 <span className="text-gray-700">
//                   Hello, {user.profile?.name || user.username}
//                 </span>
//                 <button
//                   onClick={handleLogout}
//                   className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-4 py-2 rounded-md text-sm font-medium text-white bg-green-500 hover:bg-green-600"
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2"
              onClick={closeMenu}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/7617/7617126.png"
                alt="GreenTrack Logo"
                className="w-8 h-8"
              />
              <span className="font-bold text-xl text-gray-900 hidden sm:block">
                GreenTrack
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === "/dashboard"
                      ? "text-green-600 bg-green-50"
                      : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  Dashboard
                </Link>

                <Link
                  to="/profile"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === "/profile"
                      ? "text-green-600 bg-green-50"
                      : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  Profile
                </Link>

                <span className="text-gray-700 px-3 py-2 text-sm">
                  Hello, {user.profile?.name || user.username}
                </span>

                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-green-500 hover:bg-green-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === "/dashboard"
                        ? "text-green-600 bg-green-50"
                        : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                    }`}
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === "/profile"
                        ? "text-green-600 bg-green-50"
                        : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                    }`}
                  >
                    Profile
                  </Link>

                  <div className="block px-3 py-2 text-base font-medium text-gray-700 border-t border-gray-100 pt-3">
                    Hello, {user.profile?.name || user.username}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-green-500 hover:bg-green-600"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
