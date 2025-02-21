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
          <Link href="/leaderboard" className="hover:text-purple-200 transition">
            Leaderboard
          </Link>
          <Link href="/about" className="hover:text-purple-200 transition">
            About
          </Link>
          <Link href="/courses" className="hover:text-purple-200 transition">
            Courses
          </Link>
          <Link href="/notes" className="hover:text-purple-200 transition">
            Notes
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-purple-800 p-4 max-h-[80vh] overflow-y-auto"
        >
          <div className="space-y-2">
            {/* Quiz Days */}
            <div className="border-b border-purple-700 pb-2 mb-2">
              <h3 className="text-purple-200 font-semibold mb-2">Quiz Days</h3>
              {[...Array(20)].map((_, i) => (
                <Link
                  key={i}
                  href={`/day/${i + 1}`}
                  className="block py-2 hover:text-purple-200"
                  onClick={() => setIsOpen(false)}
                >
                  Day {i + 1}
                </Link>
              ))}
            </div>
            
            {/* Navigation Links */}
            <Link
              href="/leaderboard"
              className="block py-2 hover:text-purple-200"
              onClick={() => setIsOpen(false)}
            >
              Leaderboard
            </Link>
            <Link
              href="/about"
              className="block py-2 hover:text-purple-200"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/courses"
              className="block py-2 hover:text-purple-200"
              onClick={() => setIsOpen(false)}
            >
              Courses
            </Link>
            <Link
              href="/notes"
              className="block py-2 hover:text-purple-200"
              onClick={() => setIsOpen(false)}
            >
              Notes
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar