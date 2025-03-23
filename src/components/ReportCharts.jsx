//   ReportCharts.jsx
//   
//  Descripción:
//   Este componente muestra una gráfica de barras con los datos de las consultas recientes.
//
// Contribuidores:
//
//  - Carlos Roberto Rocha Trejo el 22/03/2025 (
//    GitHub: https://github.com/RobertoRochaT
//    Linkedin: https://www.linkedin.com/in/carlosr-rocha
//  )
//  
//
import React, { useEffect, useState, useContext } from 'react';
import Chart from 'react-apexcharts';
import { AppContext } from '../context/AppContext.jsx';

const ReportCharts = () => {
  const { fetchQuerys } = useContext(AppContext);
  const [data, setData] = useState({
    series: [{ name: 'Consultas al Bot', data: [] }],
    options: {
      chart: {
        height: 'auto',
        type: 'area',
        background: '#F6F8FA',
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
        },
      },
      colors: ['#FF7F00'],
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth' },
      xaxis: {
        type: 'datetime',
        categories: [],
        labels: { format: 'dd/MM/yyyy' },
      },
      yaxis: { title: { text: 'Número de Consultas' } },
      tooltip: { x: { format: 'dd/MM/yyyy' } },
      title: {
        text: 'Consultas al Bot',
        align: 'left',
        style: { fontSize: '15px', fontWeight: 'bold' },
      },
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('daily');

  useEffect(() => {
    const fetchBotData = async () => {
      try {
        const response = await fetchQuerys();
        if (response && response.conversations) {
          const consultsData = response.conversations.map((conversation) => ({
            date: conversation.timestamp,
            count: 1, // Cada conversación cuenta como una consulta
          }));

          const groupedData = groupDataByViewMode(consultsData, viewMode);

          setData((prevData) => ({
            ...prevData,
            series: [{ name: 'Consultas al Bot', data: groupedData.map((item) => item.count) }],
            options: {
              ...prevData.options,
              xaxis: {
                ...prevData.options.xaxis,
                categories: groupedData.map((item) => item.date),
                labels: {
                  format:
                    viewMode === 'daily' ? 'dd/MM/yyyy' : viewMode === 'monthly' ? 'MM/yyyy' : 'yyyy',
                },
              },
            },
          }));
        } else {
          setError('No data found');
        }
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBotData();
  }, [fetchQuerys, viewMode]);

  const groupDataByViewMode = (data, mode) => {
    const grouped = {};
    data.forEach((item) => {
      const date = new Date(item.date);
      let key;
      if (mode === 'monthly') {
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      } else if (mode === 'yearly') {
        key = `${date.getFullYear()}`;
      } else {
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      }

      if (!grouped[key]) {
        grouped[key] = { date: key, count: 0 };
      }
      grouped[key].count += item.count;
    });

    return Object.values(grouped);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="w-full mx-auto bg-white shadow-md rounded-lg p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mb-4">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-blue-500 hover:text-white disabled:opacity-50 transition-colors"
          onClick={() => handleViewModeChange('daily')}
        >
          Diario
        </button>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-blue-500 hover:text-white disabled:opacity-50 transition-colors"
          onClick={() => handleViewModeChange('monthly')}
        >
          Mensual
        </button>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-blue-500 hover:text-white disabled:opacity-50 transition-colors"
          onClick={() => handleViewModeChange('yearly')}
        >
          Anual
        </button>
      </div>
      {loading ? (
        <p className="text-center text-gray-500">Cargando datos...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : data.series[0].data.length > 0 ? (
        <div className="w-full overflow-hidden">
          <Chart
            options={data.options}
            series={data.series}
            type="area"
            height={window.innerWidth < 640 ? 250 : 350}
            width="100%"
          />
        </div>
      ) : (
        <p className="text-center text-gray-500">No hay datos disponibles para mostrar el gráfico.</p>
      )}
    </div>
  );
};

export default ReportCharts;