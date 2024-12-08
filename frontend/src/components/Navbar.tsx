import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { Outlet } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    authContext?.logout();
    navigate('/login');
  };

  return (
    <div>
      <nav className="flex gap-4 justify-between py-4 px-10" style={{ borderBottom: '1px solid #ccc' }}>
        <div className="flex gap-4">
          <NavLink to="/products" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
            Products
          </NavLink>
          <NavLink to="/cart" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
            Cart
          </NavLink>
          <NavLink to="/purchased" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
            Purchased
          </NavLink>
        </div>
        {authContext?.isAuthenticated ? (
          <button onClick={handleLogout} className="bg-red-300 rounded-md font-semibold px-5 py-1">
            Logout
          </button>
        ) : (
          ''
        )}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Navbar;
