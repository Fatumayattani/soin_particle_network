import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X,Wallet, LogIn } from 'lucide-react';
import { useUser } from '../context/UserContext'; // Import the UserContext

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser(); // Access user data from context

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/community', label: 'Community' },
    { path: '/support-groups', label: 'Support Groups' },
    { path: '/resources', label: 'Resources' },
    { path: '/pricing', label: 'Pricing' },
  ];

  return (
    <nav className="bg-pink-50 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
          <Link to="/" className="flex-shrink-0 text-black font-bold text-xl">
  SoinHealth
</Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'text-pink-600 bg-white'
                        : 'text-pink-700 hover:text-pink-900'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-white text-pink-600 px-4 py-2 rounded-lg hover:bg-pink-50 transition-colors">
              <Wallet className="h-4 w-4" />
              <span>Get Started</span>
            </button>
            {user ? ( // Check if user is logged in
              <span className="text-pink-600">Welcome, {user.name}</span> // Display user's name
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-pink-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-pink-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-pink-700 hover:text-pink-900'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/auth"
              className="block px-3 py-2 rounded-md text-base font-medium text-pink-600 hover:text-pink-700"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
