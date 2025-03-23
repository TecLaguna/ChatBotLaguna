//   Dashboard.jsx
//   
//  Descripción:
//   Este archivo define el componente de React que representa el tablero de control de la aplicación.
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
import Card from '../components/Card.jsx';
import RecentQuery from '../pages/RecentQuery.jsx';
import { useContext,useState,useEffect } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import Reports from './Reports.jsx';
const Dashborad = () => {
    const { fetchQuerys } = useContext(AppContext);
    const [querys, setQuerys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const getQuerys = async () => {
        try {
          const response = await fetchQuerys(); // Obtiene la respuesta
          if (response && response.conversations) {
            setQuerys(response.conversations); // Actualiza el estado con el array de consultas
            
          } else {
            setError("No queries found"); // Maneja el caso en que no haya datos
          }
        } catch (err) {
          setError("Error fetching queries");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      
      getQuerys(); // Llama a la función asíncrona
    }, [fetchQuerys]);


    const countFailed = querys.filter((query) => query.status === "Failed").length;
    const countSuccess = querys.filter((query) => query.status === "Success").length;
    const mostConsulted = () => {
      const queryCounts = {};
  
      // Contar cuántas veces aparece cada consulta
      querys.forEach((query) => {
        const queryText = query.question;
        if (queryCounts[queryText]) {
          queryCounts[queryText]++;
        } else {
          queryCounts[queryText] = 1;
        }
      });
  
      // Encontrar la consulta con el mayor número de ocurrencias
      let mostFrequentQuery = null;
      let maxCount = 0;
  
      for (const [queryText, count] of Object.entries(queryCounts)) {
        if (count > maxCount) {
          mostFrequentQuery = queryText;
          maxCount = count;
        }
      }
  
      return mostFrequentQuery || "No queries available"; // Devuelve la consulta más frecuente o un mensaje por defecto
    };

  return (
    <section className="w-full max-w-5xl flex flex-col items-center mx-auto">
      <div className="flex flex-wrap justify-center gap-4 p-4">
        <Card name="Consults" icon="chatDots" amount={querys.length} percentage={null} active={true} query={null} />
        <Card name="Failed" icon="bugIcon" amount={countFailed} active={true} query={null} />
        <Card name="Success" icon="check" amount={countSuccess} active={true} query={null} />
        <Card name="Top Consults" icon="award" amount={null} percentage={0.96} active={true} query={mostConsulted()} />
      </div>
      <div>
      </div>
      <div>
        <RecentQuery />
      </div>
    </section>
  );
};

export default Dashborad;
