//   AppContext.jsx
//   
//  Descripción:
//   Este archivo define el contexto de la aplicación, que se utiliza para compartir
//
// Contribuidores:
//
//  - Carlos Roberto Rocha Trejo el 22/03/2025 (
//    GitHub: https://github.com/RobertoRochaT
//    Linkedin: https://www.linkedin.com/in/carlosr-rocha
//  )
//  
//
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const fetchQuerys = async () => {
    try {
      const response = await axios.get(`${backendUrl}/conversations`);
      if (response.status === 200) {
        console.log("Data from fetchQuerys:", response.data); // Depuración
        return response.data; // Devuelve los datos obtenidos
      } else {
        toast.error(response.data.message);
        return { queries: [] }; // Devuelve un objeto con un array vacío en caso de error
      }
    } catch (error) {
      toast.error(error.message);
      return { queries: [] }; // Devuelve un objeto con un array vacío en caso de error
    }
  };

  useEffect(() => {
    fetchQuerys();
  }, []);

  const value = {
    backendUrl,
    fetchQuerys,
    isSidebarOpen,
    setIsSidebarOpen,
    user,
    getToken
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};