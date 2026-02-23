import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/devLogo2.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const user = useSelector((store) => store.user);

  return (
    <div className="w-full">
      {!user && (
    <div className="absolute top-0 left-0 w-full z-50 px-6 py-6">
      
      <div className="flex items-center gap-3">
        
        {/* Round Logo */}
        <img
          src={logo}
          alt="DevConnect Logo"
          className="
            w-20 h-20 sm:w-10 sm:h-10
            rounded-full
            object-cover
            mix-blend-lighten
            opacity-90
            drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]
            transition duration-300
          "
        />

        {/* Text */}
        <h1 className="text-white text-xl sm:text-4xl font-bold tracking-tight">
          Dev Connect
        </h1>

      </div>

    </div>
  )}

      {/* Logo Section (NO background block now) */}

      {user && (
        <div className="navbar bg-[#1C1C1C]/90 backdrop-blur-sm text-white px-4 md:px-8">

          <div className="flex-1">
            <Link to="/feed" className="text-xl font-semibold">
              Home🏠
            </Link>
          </div>

          <div className="flex items-center gap-3 md:gap-5">

            {/* Search - Responsive */}
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered bg-black/40 border-gray-600 text-white w-24 sm:w-40 md:w-auto"
            />

            {/* User Dropdown */}
            <div className="relative flex items-center gap-3">
              <p className="hidden md:block text-sm">
                Welcome, {user.name}
              </p>

              <div
                role="button"
                onClick={() => setOpen(!open)}
                className="cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-600">
                  <img
                    src={user.photoUrl}
                    alt="user"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {open && (
                <ul className="absolute right-0 top-14 bg-[#1C1C1C] border border-gray-700 rounded-lg w-52 p-2 shadow-lg z-50">
                  <li>
                    <Link
                      to="/profile"
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2 hover:bg-gray-800 rounded"
                    >
                      ⚧️ My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/accepted/connections"
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2 hover:bg-gray-800 rounded"
                    >
                      🫂 Connections
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/interested/connections"
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2 hover:bg-gray-800 rounded"
                    >
                      🫴 Incoming Requests
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/logout"
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2 hover:bg-gray-800 rounded"
                    >
                      🚷 Logout
                    </Link>
                  </li>
                </ul>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
