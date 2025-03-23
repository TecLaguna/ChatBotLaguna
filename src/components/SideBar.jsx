//   Sidebar.jsx
//   
//  Descripción:
//   Este componente es el encargado de mostrar el menú lateral de la aplicación.
//
// Contribuidores:
//
//  - Carlos Roberto Rocha Trejo el 22/03/2025 (
//    GitHub: https://github.com/RobertoRochaT
//    Linkedin: https://www.linkedin.com/in/carlosr-rocha
//  )
//  
//
import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';

const SideBar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(AppContext);
  const sidebarRef = useRef(null);

  // Cerrar el SideBar al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen, setIsSidebarOpen]);

  return (
    <>

      {/* Fondo oscuro semitransparente */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* SideBar */}
      <aside
        ref={sidebarRef}
        className={`w-64 h-screen bg-gray-800 text-white fixed top-0 left-0 overflow-y-auto transform transition-transform duration-300 z-50 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Botón de cierre en la esquina superior derecha */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 text-white focus:outline-none"
        >
            Close
          <i className="bi bi-x-lg"></i>
        </button>

        <ul className="pt-20 sidebar-nav p-4">
          <li className="nav-item mb-2">
            <a className={`nav-link flex items-center p-2 ${window.location.pathname == '/home' ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'} rounded`} href="/home">
              <i className="bi bi-grid mr-2"></i>
              <span>Dashboard 📊</span>
            </a>
          </li>

          <li className="nav-item mb-2">
            <a
              className="nav-link flex items-center p-2 hover:bg-gray-700 rounded"
              data-bs-target="#components-nav"
              data-bs-toggle="collapse"
              href="/train"
            >
              <i className="bi bi-menu-button-wide mr-2"></i>
              <span>Train 🏋️‍♂️</span>
              <i className="bi bi-chevron-down ml-auto"></i>
            </a>
            <ul
              id="components-nav"
              className="nav-content collapse pl-4"
              data-bs-parent="#sidebar-nav"
            >
            </ul>
        </li>

          <li className="nav-heading mt-6 mb-2 text-sm font-semibold text-gray-400 uppercase">
            Pages
          </li>
        </ul>
      </aside>
    </>
  );
};

export default SideBar;