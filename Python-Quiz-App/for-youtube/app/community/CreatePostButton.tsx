'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X } from 'lucide-react'
// import { toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import { client } from '@/lib/sanity' // Ensure you have the sanity client set up
import toast from 'react-hot-toast'

const categories = [
  { id: 'question', label: 'Question' },
  { id: 'project', label: 'Project Showcase' },
  { id: 'discussion', label: 'Discussion' },
  { id: 'resource', label: 'Resource' }
]

export default function CreatePostButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id) // Default category
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [authorName, setAuthorName] = useState('') // New state for author name

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const postData = {
      _type: 'communityPost',
      title,
      content: [{ _type: 'block', children: [{ _type: 'span', text: content }] }],
      authorName, // Use the author name from the state
      category: selectedCategory,
      publishedAt: new Date().toISOString()
    }

    try {
      await client.create(postData)
      toast.success('Post created successfully!') // Show success toast
      setIsModalOpen(false) // Close modal after submission
      setTitle('') // Reset title
      setContent('') // Reset content
      setAuthorName('') // Reset author name
    } catch (error) {
      toast.error('Failed to create post. Please try again.') // Show error toast
      console.error('Error creating post:', error)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
      >
        <Plus size={20} />
        Create Post
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-[90%] max-w-2xl bg-gradient-to-b from-purple-900 to-gray-900 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Create New Post</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-purple-200 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your name"
                  required
                />
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your post title"
                  required
                />
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-purple-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>

                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-white/10 text-white rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Write your post content..."
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2"
                >
                  Submit
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
