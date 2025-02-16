'use client'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'

interface PostProps {
  post: {
    title: string
    content: any
    authorName: string
    publishedAt: string
    category: string
  }
}

export default function CommunityPost({ post }: PostProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transition-all hover:shadow-lg"
    >
      <h2 className="text-xl font-semibold text-white mb-2">{post.title}</h2>
      <p className="text-purple-200 text-sm mb-2">Category: {post.category}</p>
      <p className="text-purple-200 text-sm mb-2">By: {post.authorName}</p>
      <p className="text-purple-200 text-sm mb-4">{formatDistanceToNow(new Date(post.publishedAt))} ago</p>
      <div className="prose prose-invert max-w-none mb-4">
        {/* Render content here */}
        {post.content.map((block: any, index: number) => {
          if (block._type === 'block') {
            return <p key={index}>{block.children[0].text}</p>
          }
          return null
        })}
      </div>
    </motion.div>
  )
}