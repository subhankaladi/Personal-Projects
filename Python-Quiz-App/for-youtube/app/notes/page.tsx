"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRegFileAlt } from "react-icons/fa";
import { Note } from "../types/types";
import { client } from "@/lib/sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Modal from "react-modal";
import { FcCalendar } from "react-icons/fc";
import { GiNotebook } from "react-icons/gi";



const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "90%",
    maxHeight: "90%",
  },
};

const NoteList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    Modal.setAppElement(document.body);
    client.fetch('*[_type == "note"] | order(date asc)').then((data: Note[]) => {
      setNotes(data);
    });
  }, []);

  return (
    <div className="p-6 space-y-10 mt-14 flex flex-col items-center">
      <motion.h1
        className="text-4xl font-extrabold text-indigo-600"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        📚 Class Notes Section 📖
      </motion.h1>

      <motion.h2
        className="text-2xl font-semibold text-gray-700"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
      >
        Your Study Hub 📝
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {notes.map((note) => (
          <motion.div
            key={note._id}
            className="p-5 border rounded-lg shadow-lg bg-white hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <h4 className="text-xl font-bold flex items-center">
              <FaRegFileAlt className="mr-2 text-indigo-600" />
              {note.title}
            </h4>
            <p className="text-gray-600 mt-2">{note.description}</p>
            <div className="flex space-x-2 mt-3">
              {note.images?.map((image, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 cursor-pointer"
                  onClick={() => setSelectedImage(urlFor(image).url())}
                >
                  <Image
                    src={urlFor(image).url()}
                    alt={`Note image ${index + 1}`}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
            <p className="text-gray-500 mt-2"><FcCalendar/> Date: {new Date(note.date).toLocaleDateString()}</p>
          </motion.div>
        ))}
      </div>

      {isClient && (
        <Modal
          isOpen={!!selectedImage}
          onRequestClose={() => setSelectedImage(null)}
          style={customModalStyles}
          contentLabel="Image Modal"
          
        >
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Full-size note image"
              width={800}
              height={600}
              className="object-contain"
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default NoteList;
