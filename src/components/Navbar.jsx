//   Navbar.jsx
//   
//  Descripción:
//   Componente que muestra un navbar con el logo de la aplicación y un botón de login.
//
// Contribuidores:
//
//  - Carlos Roberto Rocha Trejo el 22/03/2025 (
//    GitHub: https://github.com/RobertoRochaT
//    Linkedin: https://www.linkedin.com/in/carlosr-rocha
//  )
//  
//
import { useContext } from 'react';
import { assets } from '../assets/assets';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const { isSidebarOpen, setIsSidebarOpen } = useContext(AppContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='shadow py-4'>
      <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="text-xl focus:outline-none">
            ☰
          </button>
          <p onClick={() => navigate('/')} className='text-xl cursor-pointer'>
            Chatbot Laguna <span className='font-bold text-yellow-600'>Dashboard</span>
          </p>
        </div>
        {/*user ? (
          <div className='flex items-center gap-3'>
            <p className='max-sm:hidden'>Hi 👋, {user.firstName + " " + user.lastName}</p>
              <UserButton />
           
          </div>
        ) : (
          <div className='flex gap-4 max-sm:text-xs'>
            <button onClick={e => openSignIn()} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'>
              Login
            </button>
          </div>
        )*/}
      </div>
    </div>
  );
};

export default Navbar;