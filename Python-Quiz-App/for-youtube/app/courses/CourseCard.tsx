'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Clock, BookOpen, Youtube } from 'lucide-react'

interface CourseProps {
  course: {
    title: string
    description: string
    thumbnailUrl: string
    youtubePlaylistUrl: string
    duration: string
    difficulty: string
    topics: string[]
  }
}

export default function CourseCard({ course }: CourseProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      layout
      className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48 w-full">
        <Image
          src={course.thumbnailUrl}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
        
        <div className="flex items-center gap-4 text-purple-200 mb-4">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span className="text-sm">{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen size={16} />
            <span className="text-sm capitalize">{course.difficulty}</span>
          </div>
        </div>

        <motion.div layout>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <p className="text-purple-100">{course.description}</p>
                
                {course.topics && course.topics.length > 0 && (
                  <div>
                    <h4 className="text-white font-medium mb-2">Topics Covered:</h4>
                    <ul className="list-disc list-inside text-purple-200 space-y-1">
                      {course.topics.map((topic, index) => (
                        <li key={index}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <a
                  href={course.youtubePlaylistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Youtube size={20} />
                  Watch on YouTube
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center gap-2 text-purple-300 hover:text-purple-100 transition-colors"
        >
          <span>{isExpanded ? 'Show Less' : 'Learn More'}</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </button>
      </div>
    </motion.div>
  )
} 