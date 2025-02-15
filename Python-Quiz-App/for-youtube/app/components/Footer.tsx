'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Youtube, 
  Github, 
  Twitter, 
  Mail, 
  Heart, 
  Code, 
  Coffee,
  Loader2,
  Facebook,
  Instagram,
  Linkedin,
  BookOpen,
  MessageCircle,
  Phone,
  X
} from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { client } from '@/lib/sanity'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    setIsLoading(true)

    try {
      const existingSubscriber = await client.fetch(
        `*[_type == "subscriber" && email == $email][0]`,
        { email }
      )

      if (existingSubscriber) {
        toast('You are already subscribed! 🎉', {
          icon: '👋',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
        setIsLoading(false)
        return
      }

      await client.create({
        _type: 'subscriber',
        email,
        subscribedAt: new Date().toISOString(),
        status: 'active'
      })
      
      

      toast.success('Welcome to our community! 🚀', {
        duration: 5000,
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
      setEmail('')
    } catch (error) {
      console.error('Subscription error:', error)
      toast.error('Oops! Something went wrong. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const socialLinks = [
    { icon: Youtube, href: '#', color: 'hover:text-red-500', label: 'YouTube' },
    { icon: Github, href: '#', color: 'hover:text-gray-400', label: 'GitHub' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400', label: 'Twitter' },
    { icon: Facebook, href: '#', color: 'hover:text-blue-600', label: 'Facebook' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-500', label: 'Instagram' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-700', label: 'LinkedIn' }
  ]

  const quickLinks = [
    { icon: BookOpen, label: 'Courses', href: '/courses' },
    { icon: MessageCircle, label: 'Community', href: '/community' },
    { icon: Phone, label: 'Contact', href: '/contact' }
  ]

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white overflow-hidden">
      <Toaster position="top-center" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-violet-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Link href="/" className="inline-block">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-2xl font-bold"
              >
                <Code className="text-purple-400" />
                <span>Python Quiz Master</span>
              </motion.div>
            </Link>
            <p className="text-gray-300 max-w-md">
              Embark on your Python journey with our interactive daily quizzes. 
              Master programming concepts one challenge at a time.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    href={link.href}
                    className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors"
                  >
                    <link.icon size={18} />
                    <span>{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 className="text-xl font-semibold mb-6">Connect With Us</h4>
            <div className="grid grid-cols-3 gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className={`${social.color} transition-colors flex flex-col items-center gap-2`}
                >
                  <social.icon size={24} />
                  <span className="text-xs">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="border-t border-gray-800 pt-12 mt-12"
        >
          <div className="max-w-md mx-auto text-center">
            <h5 className="text-2xl font-semibold mb-4">Stay Updated</h5>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for the latest Python tutorials and quiz updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:outline-none focus:border-purple-500 transition-colors"
                disabled={isLoading}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>Processing...</span>
                  </>
                ) : (
                  'Subscribe'
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="border-t border-gray-800 mt-12 pt-8 text-center"
        >
          <p className="flex items-center justify-center gap-2 text-gray-300">
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart className="text-red-500" size={16} />
            </motion.span>
            <span>and</span>
            <Coffee className="text-yellow-600" size={16} />
            <span className="text-purple-400">© 2024 Python Quiz Master</span>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer