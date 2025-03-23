//   Main.jsx
//   
//  Descripción:
//   Página principal de la aplicación, contiene el componente Dashboard.
//
// Contribuidores:
//
//  - Carlos Roberto Rocha Trejo el 22/03/2025 (
//    GitHub: https://github.com/RobertoRochaT
//    Linkedin: https://www.linkedin.com/in/carlosr-rocha
//  )
//  
//
import React from 'react';
import Dashboard from './Dashborad.jsx';

const Main = () => {
  return (
    <main className="flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-5xl flex flex-col"> 
        <Dashboard />
      </div>
    </main>
  );
};

export default Main;
