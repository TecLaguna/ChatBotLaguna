//   RecentQuerysTable.jsx
//   
//  Descripción:
//   Este componente muestra una tabla con las consultas recientes.
//
// Contribuidores:
//
//  - Carlos Roberto Rocha Trejo el 22/03/2025 (
//    GitHub: https://github.com/RobertoRochaT
//    Linkedin: https://www.linkedin.com/in/carlosr-rocha
//  )
//  
//
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const RecentQuerysTable = () => {
  const { fetchQuerys } = useContext(AppContext);
  const [querys, setQuerys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredQuerys, setFilteredQuerys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const getQuerys = async () => {
      try {
        const response = await fetchQuerys();
        if (response && response.conversations) {
          setQuerys(response.conversations);
          const newFiltered = response.conversations.slice().reverse();
          setFilteredQuerys(newFiltered);
        } else {
          setError('No queries found');
        }
      } catch (err) {
        setError('Error fetching queries');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getQuerys();
  }, [fetchQuerys]);

  const totalPages = Math.ceil(filteredQuerys.length / itemsPerPage);
  const currentQuerys = filteredQuerys.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('es-ES', options);
  };

  // Lógica para mostrar los botones de paginación con "..."
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5; // Máximo de botones visibles
    const halfVisibleButtons = Math.floor(maxVisibleButtons / 2);

    // Botón para la primera página
    buttons.push(
      <button
        key={1}
        onClick={() => setCurrentPage(1)}
        className={`px-4 py-2 rounded ${
          currentPage === 1
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
        } transition-colors`}
      >
        1
      </button>
    );

    // Botón "..." si la página actual está lejos de la primera página
    if (currentPage - halfVisibleButtons > 2) {
      buttons.push(
        <button
          key="ellipsis-start"
          onClick={() => setCurrentPage(currentPage - halfVisibleButtons)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-blue-500 hover:text-white transition-colors"
        >
          ...
        </button>
      );
    }

    // Botones centrales
    for (
      let i = Math.max(2, currentPage - halfVisibleButtons);
      i <= Math.min(totalPages - 1, currentPage + halfVisibleButtons);
      i++
    ) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-4 py-2 rounded ${
            currentPage === i
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
          } transition-colors`}
        >
          {i}
        </button>
      );
    }

    // Botón "..." si la página actual está lejos de la última página
    if (currentPage + halfVisibleButtons < totalPages - 1) {
      buttons.push(
        <button
          key="ellipsis-end"
          onClick={() => setCurrentPage(currentPage + halfVisibleButtons)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-blue-500 hover:text-white transition-colors"
        >
          ...
        </button>
      );
    }

    // Botón para la última página
    if (totalPages > 1) {
      buttons.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
          } transition-colors`}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  if (loading) return <div className="text-center text-gray-500 py-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-4">{error}</div>;

  return (
    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Conversation Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Query
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentQuerys.map((query, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                  {formatDate(query.timestamp)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                  {new Date(query.timestamp).toLocaleTimeString('es-ES')}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 truncate max-w-[150px]">
                  {query.conversation_name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 truncate max-w-[200px]">
                  {query.question}
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  <span
                    className={`${
                      query.status === 'Success'
                        ? 'text-green-600'
                        : query.status === 'Failed'
                        ? 'text-red-600'
                        : query.status === 'Processing'
                        ? 'text-yellow-600'
                        : 'text-gray-900'
                    }`}
                  >
                    {query.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredQuerys.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 py-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-blue-500 hover:text-white disabled:opacity-50 transition-colors"
          >
            Anterior
          </button>
          <div className="flex flex-wrap justify-center gap-2">
            {renderPaginationButtons()}
          </div>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-blue-500 hover:text-white disabled:opacity-50 transition-colors"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentQuerysTable;