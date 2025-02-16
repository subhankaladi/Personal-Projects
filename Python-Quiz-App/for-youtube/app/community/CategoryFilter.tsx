'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const categories = [
  { id: 'all', label: 'All Posts' },
  { id: 'question', label: 'Questions' },
  { id: 'project', label: 'Projects' },
  { id: 'discussion', label: 'Discussions' },
  { id: 'resource', label: 'Resources' }
]

export default function CategoryFilter() {
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className={`px-4 py-2 rounded-lg transition-all ${activeCategory === category.id ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          whileHover={{ scale: 1.05 }}
        >
          {category.label}
        </motion.button>
      ))}
    </div>
  )
}
