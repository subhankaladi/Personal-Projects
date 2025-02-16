'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Brain, Trophy, Users, Star } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-b from-purple-100 to-white py-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Brain size={80} className="mx-auto text-purple-600 mb-6" />
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl md:text-6xl font-bold text-gray-800 mb-6"
            >
              Master Python with Daily Quizzes
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 mb-8"
            >
              Challenge yourself with our interactive Python programming quizzes
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center space-y-4"
            >
              <Link
                href="/day"
                className="inline-flex items-center px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
              >
                Start Quiz <ArrowRight className="ml-2" />
              </Link>
              <Link
                href="/community"
                className="inline-flex items-center px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
              >
                Go to Community <ArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -10 }}
              className="p-6 bg-white rounded-xl shadow-lg"
            >
              <Trophy className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Daily Challenges</h3>
              <p className="text-gray-600">
                New Python quizzes every day to keep you learning
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="p-6 bg-white rounded-xl shadow-lg"
            >
              <Users className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Community Learning</h3>
              <p className="text-gray-600">
                Join other Python enthusiasts in their learning journey
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="p-6 bg-white rounded-xl shadow-lg"
            >
              <Star className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your improvement with detailed statistics
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-purple-900 text-white py-20"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Python Journey?
          </h2>
          <p className="text-xl mb-8">
            Begin with Day 1 and master Python one quiz at a time
          </p>
          <Link
            href="/day1"
            className="inline-flex items-center px-8 py-3 bg-white text-purple-900 rounded-full hover:bg-purple-100 transition"
          >
            Start Now <ArrowRight className="ml-2" />
          </Link>
        </div>
      </motion.section> */}
    </div>
  )
}