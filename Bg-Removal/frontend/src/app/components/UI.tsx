'use client';

import { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiX, FiDownload, FiImage, FiCheck } from 'react-icons/fi';
import { FaMagic } from 'react-icons/fa';

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };
  
  const processFile = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setSelectedFile(file);
        setProcessedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };

  const handleRemoveBackground = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('https://jubilant-vitality-production.up.railway.app/remove-bg', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setProcessedImage(imageUrl);
    } catch (err) {
      console.error('Background removal failed:', err);
      setError('Failed to remove background. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'background-removed.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">
            Magic Background Remover
          </h1>
          <p className="text-gray-600 text-lg">
            Upload your image and watch the background disappear like magic!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${
              isDragging ? 'ring-4 ring-purple-500' : ''
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!image ? (
              <div className="p-8 text-center h-full flex flex-col items-center justify-center">
                <div className="mb-6">
                  <FiImage className="w-16 h-16 text-purple-400 mx-auto" />
                  <div className="mt-4 h-2 w-20 bg-purple-200 rounded-full mx-auto overflow-hidden">
                    <motion.div 
                      className="h-full bg-purple-500 rounded-full"
                      animate={{ width: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </div>
                
                <motion.div 
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <FiUpload className="w-5 h-5" />
                    Select Image
                  </button>
                </motion.div>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                
                <p className="mt-4 text-gray-500">
                  or drag and drop your image here
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Supports JPG, PNG, WEBP (Max 10MB)
                </p>
              </div>
            ) : (
              <div className="relative h-96">
                <Image
                  src={image}
                  alt="Original"
                  fill
                  className="object-contain p-4"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setImage(null);
                    setSelectedFile(null);
                  }}
                  className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Preview Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="relative h-96">
              {processedImage ? (
                <>
                  <Image
                    src={processedImage}
                    alt="Processed"
                    fill
                    className="object-contain p-4"
                  />
                  <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:40px_40px] opacity-10 pointer-events-none" />
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                  <AnimatePresence>
                    {loading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center"
                      >
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mb-4"
                        />
                        <p className="text-xl text-purple-600 font-medium">
                          Working magic on your image...
                        </p>
                        <p className="text-gray-500 mt-2">
                          This may take a few seconds
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center"
                      >
                        <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                          <FaMagic className="w-10 h-10 text-purple-500" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-700 mb-2">
                          {image ? 'Ready to remove background!' : 'Processed image'}
                        </h3>
                        <p className="text-gray-500">
                          {image ? 'Click the button below' : 'Will appear here'}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRemoveBackground}
            disabled={!image || loading}
            className={`px-8 py-4 rounded-full text-lg font-medium shadow-lg transition-all flex items-center justify-center gap-2 ${
              !image || loading
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white'
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <FaMagic className="w-5 h-5" />
                Remove Background
              </>
            )}
          </motion.button>

          {processedImage && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-medium shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-2"
            >
              <FiDownload className="w-5 h-5" />
              Download Image
            </motion.button>
          )}
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg max-w-md mx-auto"
            >
              <div className="flex items-center">
                <FiX className="w-5 h-5 mr-2" />
                <p>{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {processedImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg max-w-md mx-auto"
            >
              <div className="flex items-center">
                <FiCheck className="w-5 h-5 mr-2" />
                <p>Background removed successfully!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}