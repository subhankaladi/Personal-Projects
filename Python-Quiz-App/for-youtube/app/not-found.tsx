"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/'); // Redirect to home after 5 seconds
    }, 5000); // Adjust the time as needed

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-100 to-white">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-2">Oops! Page Not Found</h2>
        <p className="text-gray-500 mb-6">The page you are looking for does not exist.</p>
        <p className="text-gray-500 mb-6">You will be redirected to the homepage in 5 seconds.</p>
        <motion.button
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition"
          onClick={() => router.push('/')}
          whileHover={{ scale: 1.05 }}
        >
          Go to Homepage
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFound; 