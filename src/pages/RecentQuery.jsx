//   Navbar.jsx
//   
//  Descripción:
//   Barra de navegación de la aplicación.
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
import RecentQuerysTable from '../components/RecentQuerysTable';
import ReportCharts from '../components/ReportCharts';

const RecentQuery = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8">
      <div className="flex justify-center">
        <div className="w-full max-w-screen-xl space-y-6">
          <ReportCharts />
          <RecentQuerysTable />
        </div>
      </div>
    </div>
  );
};

export default RecentQuery;