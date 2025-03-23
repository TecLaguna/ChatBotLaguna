import React, { useEffect } from 'react';
import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  // Redirigir al usuario si ya está autenticado
  useEffect(() => {
    // Verifica si el usuario está autenticado
    const checkAuth = async () => {
      const isSignedIn = await window.Clerk?.user; // Accede al estado de autenticación de Clerk
      if (isSignedIn) {
        navigate('/'); // Redirige a la página de inicio
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Bienvenido 👋</h1>
        <p className="text-gray-600 mb-6">Accede para disfrutar de todas las funcionalidades.</p>

        <SignedOut>
          <SignIn afterSignInUrl="/home" /> {/* Redirige automáticamente después del inicio de sesión */}
        </SignedOut>

        <SignedIn>
          {/* No es necesario hacer nada aquí, ya que Clerk redirigirá automáticamente */}
        </SignedIn>
      </motion.div>
    </div>
  );
};

export default Login;