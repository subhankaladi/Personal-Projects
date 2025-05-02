// 'use client';

// import { useState, useRef, ChangeEvent } from 'react';
// import Image from 'next/image';

// export default function Home() {
//   const [image, setImage] = useState<string | null>(null);
//   const [processedImage, setProcessedImage] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImage(e.target?.result as string);
//         setSelectedFile(file); // Store the actual file object
//         setProcessedImage(null);
//         setError(null);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemoveBackground = async () => {
//     if (!selectedFile) {
//       setError('Please select an image first');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const formData = new FormData();
//       formData.append('file', selectedFile); // Use the stored file object

//       const response = await fetch('http://127.0.0.1:8000/remove-bg', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`Server responded with status ${response.status}`);
//       }

//       const blob = await response.blob();
//       const imageUrl = URL.createObjectURL(blob);
//       setProcessedImage(imageUrl);
//     } catch (err) {
//       console.error('Background removal failed:', err);
//       setError('Failed to remove background. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownload = () => {
//     if (!processedImage) return;
    
//     const link = document.createElement('a');
//     link.href = processedImage;
//     link.download = 'background-removed.png';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <main className="min-h-screen p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-8">Background Removal Tool</h1>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Upload Section */}
//           <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
//             {!image ? (
//               <div className="space-y-4">
//                 <p className="text-gray-600">Drag and drop an image here or</p>
//                 <button
//                   onClick={() => fileInputRef.current?.click()}
//                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 >
//                   Select Image
//                 </button>
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleImageUpload}
//                   accept="image/*"
//                   className="hidden"
//                 />
//               </div>
//             ) : (
//               <div className="relative h-64">
//                 <Image
//                   src={image}
//                   alt="Original"
//                   fill
//                   className="object-contain"
//                 />
//                 <button
//                   onClick={() => {
//                     setImage(null);
//                     setSelectedFile(null);
//                   }}
//                   className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
//                 >
//                   ×
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Preview Section */}
//           <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
//             {processedImage ? (
//               <div className="relative h-64">
//                 <Image
//                   src={processedImage}
//                   alt="Processed"
//                   fill
//                   className="object-contain"
//                 />
//               </div>
//             ) : (
//               <div className="h-64 flex items-center justify-center">
//                 <p className="text-gray-600">
//                   {loading ? 'Processing...' : 'Processed image will appear here'}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="mt-8 flex justify-center space-x-4">
//           <button
//             onClick={handleRemoveBackground}
//             disabled={!image || loading}
//             className={`px-6 py-2 rounded ${
//               !image || loading
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-green-500 hover:bg-green-600'
//             } text-white`}
//           >
//             {loading ? 'Processing...' : 'Remove Background'}
//           </button>

//           {processedImage && (
//             <button
//               onClick={handleDownload}
//               className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
//             >
//               Download
//             </button>
//           )}
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mt-4 text-center text-red-500">
//             {error}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }


import React from 'react'
// import BackgroundRemover from './components/subhero'
import Home from './components/UI'
import DetailsSection from './components/subhero'

const page = () => {
  return (
    <div>
      <Home/>
      <DetailsSection/>
    </div>
  )
}

export default page