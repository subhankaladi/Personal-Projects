'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu } from '@headlessui/react'
import { ChevronDown, Brain, Menu as MenuIcon } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-4 px-6 fixed w-full top-0 z-50"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Brain size={32} />
          </motion.div>
          <span className="text-2xl font-bold">PyQuizMaster</span>
        </Link>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <MenuIcon size={24} />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-white/10 transition">
              <span>Quiz Days</span>
              <ChevronDown size={16} />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-gray-800 max-h-[60vh] overflow-y-auto">
              {[...Array(20)].map((_, i) => (
                <Menu.Item key={i}>
                  {({ active }) => (
                    <Link
                      href={`/day/${i + 1}`}
                      className={`block px-4 py-2 ${
                        active ? 'bg-purple-50 text-purple-700' : ''
                      }`}
                    >
                      Day {i + 1}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-white/10 transition">
              <span>Quizzes</span>
              <ChevronDown size={16} />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-gray-800 max-h-[60vh] overflow-y-auto">
              {['Basic', 'Intermediate', 'Advanced'].map((type) => (
                <div key={type} className="border-b border-gray-200">
                  <h3 className="px-4 py-2 font-semibold">{type}</h3>
                  {[...Array(5)].map((_, level) => (
                    <Menu.Item key={level}>
                      {({ active }) => (
                        <Link
                          href={`/quiz/${type.toLowerCase()}/level${level + 1}`}
                          className={`block px-4 py-2 ${
                            active ? 'bg-purple-50 text-purple-700' : ''
                          }`}
                        >
                          Level {level + 1}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              ))}
            </Menu.Items>
          </Menu>
          <Link href="/leaderboard" className="hover:text-purple-200 transition">
            Leaderboard
          </Link>
          <Link href="/about" className="hover:text-purple-200 transition">
            About
          </Link>
          <Link href="/courses" className="hover:text-purple-200 transition">
            Courses
          </Link>
          {/* <Link href="/notes" className="hover:text-purple-200 transition">
            Notes
          </Link> */}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-purple-800 p-4 max-h-[85vh] overflow-y-auto"
        >
          <div className="space-y-4">
            {/* Quizzes Section */}
            <div className="border-b border-purple-700 pb-4">
              <h3 className="text-purple-200 font-semibold text-lg mb-3 sticky top-0 bg-purple-800 py-2">Quizzes</h3>
              <div className="space-y-3">
                {['Basic', 'Intermediate', 'Advanced'].map((type) => (
                  <div key={type} className="bg-purple-900/50 rounded-lg p-2">
                    <h4 className="text-purple-200 font-medium mb-2 px-2">{type}</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {[...Array(5)].map((_, level) => (
                        <Link
                          key={level}
                          href={`/quiz/${type.toLowerCase()}/level${level + 1}`}
                          className="bg-purple-700/50 hover:bg-purple-600/50 rounded px-3 py-2 text-center text-sm"
                          onClick={() => setIsOpen(false)}
                        >
                          Level {level + 1}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quiz Days Section */}
            <div className="border-b border-purple-700 pb-4">
              <h3 className="text-purple-200 font-semibold text-lg mb-3 sticky top-0 bg-purple-800 py-2">Quiz Days</h3>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(20)].map((_, i) => (
                  <Link
                    key={i}
                    href={`/day/${i + 1}`}
                    className="bg-purple-700/50 hover:bg-purple-600/50 rounded px-3 py-2 text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Day {i + 1}
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="pt-2">
              <h3 className="text-purple-200 font-semibold text-lg mb-3 sticky top-0 bg-purple-800 py-2">Navigation</h3>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/leaderboard"
                  className="bg-purple-700/50 hover:bg-purple-600/50 rounded px-4 py-3 text-center font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Leaderboard
                </Link>
                <Link
                  href="/courses"
                  className="bg-purple-700/50 hover:bg-purple-600/50 rounded px-4 py-3 text-center font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Courses
                </Link>
                <Link
                  href="/about"
                  className="bg-purple-700/50 hover:bg-purple-600/50 rounded px-4 py-3 text-center font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/dashboard"
                  className="bg-purple-700/50 hover:bg-purple-600/50 rounded px-4 py-3 text-center font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar