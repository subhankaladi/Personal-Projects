'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Code, Lightbulb, Target, Users, Star, Coffee } from 'lucide-react'

export default function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 py-16 flex flex-col-reverse md:flex-row items-center gap-12"
      >
        {/* Left Content */}
        <motion.div 
          className="flex-1 space-y-6"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Building Future-Ready Developers
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Hi, I am <span className="font-semibold text-purple-600">Subhan Kaladi</span>, 
            a passionate developer dedicated to helping students master Python programming 
            through interactive learning.
          </p>
        </motion.div>

        {/* Right Image */}
        <motion.div 
          className="flex-1 w-full"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full min-h-[250px] sm:h-[400px]">
            <Image
              src="/subhan.png"
              alt="Subhan Kaladi"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-2xl object-contain"
              style={{ objectPosition: 'center' }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Mission Section */}
      <motion.div 
        className="bg-gradient-to-b from-purple-50 to-white py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-16"
            {...fadeInUp}
          >
            Why PyQuizMaster?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: "Interactive Learning",
                description: "Learn Python concepts through engaging quizzes and real-world examples"
              },
              {
                icon: Target,
                title: "Interview Preparation",
                description: "Get ready for technical interviews with our carefully curated questions"
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "Join a community of learners and share your programming journey"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <feature.icon className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Journey Section */}
      <motion.div 
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-16"
            {...fadeInUp}
          >
            The Journey
          </motion.h2>

          <div className="max-w-3xl mx-auto space-y-8">
            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Code className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">From Students, For Students</h3>
                <p className="text-gray-600 leading-relaxed">
                  Having gone through the journey of learning programming, I understand the 
                  challenges students face. PyQuizMaster is designed to make this learning 
                  journey smoother and more enjoyable.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Star className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Future-Ready Learning</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our platform focuses on practical knowledge that prepares you for real-world 
                  programming challenges, technical interviews, and professional development.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Coffee className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Continuous Growth</h3>
                <p className="text-gray-600 leading-relaxed">
                  We are constantly updating our question bank and adding new features based on 
                  student feedback and industry requirements.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 