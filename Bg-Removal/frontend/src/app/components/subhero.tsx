'use client';

import { FiInfo, FiCode, FiServer, FiSettings, FiLayers } from 'react-icons/fi';
import { motion } from 'framer-motion';

const DetailsSection = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Powered by advanced AI and a robust Python backend
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {/* Tech Stack Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                  <FiCode className="w-6 h-6" />
                </div>
                <h3 className="ml-4 text-lg font-medium text-gray-900">Technology Stack</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>Frontend: Next.js, TypeScript, Tailwind CSS</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>Backend: Python FastAPI</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>AI Model: U²-Net for background removal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>Animation: Framer Motion</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* API Details Card */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          > */}
            {/* <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                  <FiServer className="w-6 h-6" />
                </div>
                <h3 className="ml-4 text-lg font-medium text-gray-900">API Integration</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800">Endpoint</h4>
                  <code className="block mt-1 p-2 bg-gray-100 rounded text-sm overflow-x-auto">
                    POST http://127.0.0.1:8000/remove-bg
                  </code>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Request</h4>
                  <pre className="mt-1 p-2 bg-gray-100 rounded text-sm overflow-x-auto">
                    {`{
  file: [image file]
}`}
                  </pre>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Response</h4>
                  <p className="mt-1 text-sm text-gray-600">
                    PNG image with transparent background
                  </p>
                </div>
              </div>
            </div> */}
          {/* </motion.div> */}

          {/* How It Works Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-green-100 text-green-600">
                  <FiSettings className="w-6 h-6" />
                </div>
                <h3 className="ml-4 text-lg font-medium text-gray-900">Processing Steps</h3>
              </div>
              <ol className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mr-3">1</span>
                  <span>Image uploaded to FastAPI backend</span>
                </li>
                <li className="flex items-start">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mr-3">2</span>
                  <span>U²-Net model processes the image</span>
                </li>
                <li className="flex items-start">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mr-3">3</span>
                  <span>Background is removed with pixel-level precision</span>
                </li>
                <li className="flex items-start">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mr-3">4</span>
                  <span>Processed PNG is returned to frontend</span>
                </li>
              </ol>
            </div>
          </motion.div>
        </div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="px-6 py-8 sm:p-10">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                <FiLayers className="w-6 h-6" />
              </div>
              <h3 className="ml-4 text-2xl font-bold text-gray-900">System Performance</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-3xl font-bold text-purple-600">99.9%</p>
                <p className="mt-1 text-gray-600">Uptime</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-3xl font-bold text-purple-600">~2s</p>
                <p className="mt-1 text-gray-600">Avg. Processing</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-3xl font-bold text-purple-600">10MB</p>
                <p className="mt-1 text-gray-600">Max File Size</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-3xl font-bold text-purple-600">4K</p>
                <p className="mt-1 text-gray-600">Resolution Support</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900">Ready to transform your images?</h3>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Try our background remover today and see the magic for yourself
          </p>
          <div className="mt-8">
            <a
              href="#top" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
            >
              Back to Remover Tool
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DetailsSection;