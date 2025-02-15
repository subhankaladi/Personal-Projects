// 'use client'
// import { motion } from 'framer-motion'
// import { Trophy, Medal, Award, Star, Crown } from 'lucide-react'
// import { useState } from 'react'

// interface LeaderboardEntry {
//   rank: number
//   name: string
//   score: number
//   quizzesTaken: number
//   averageScore: number
//   lastActive: string
// }

// const dummyData: LeaderboardEntry[] = [
//   {
//     rank: 1,
//     name: "Alex Kumar",
//     score: 980,
//     quizzesTaken: 20,
//     averageScore: 98,
//     lastActive: "2 hours ago"
//   },
//   // Add more dummy data here...
// ]

// export default function Leaderboard() {
//   const [timeFilter, setTimeFilter] = useState('all')
  
//   return (
//     <div className="container mx-auto py-24 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-center mb-12"
//       >
//         <h1 className="text-4xl font-bold mb-4">
//           <span className="text-purple-600">Python Masters</span> Leaderboard
//         </h1>
//         <p className="text-gray-600">Top performers in Python programming quizzes</p>
//       </motion.div>

//       {/* Filters */}
//       <div className="mb-8 flex justify-center gap-4">
//         {['all', 'weekly', 'monthly'].map((filter) => (
//           <button
//             key={filter}
//             onClick={() => setTimeFilter(filter)}
//             className={`px-4 py-2 rounded-lg transition-all ${
//               timeFilter === filter
//                 ? 'bg-purple-600 text-white'
//                 : 'bg-gray-100 hover:bg-gray-200'
//             }`}
//           >
//             {filter.charAt(0).toUpperCase() + filter.slice(1)} Time
//           </button>
//         ))}
//       </div>

//       {/* Leaderboard Table */}
//       <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-purple-50">
//               <tr>
//                 <th className="px-6 py-4 text-left">Rank</th>
//                 <th className="px-6 py-4 text-left">User</th>
//                 <th className="px-6 py-4 text-left">Total Score</th>
//                 <th className="px-6 py-4 text-left">Quizzes Taken</th>
//                 <th className="px-6 py-4 text-left">Avg. Score</th>
//                 <th className="px-6 py-4 text-left">Last Active</th>
//               </tr>
//             </thead>
//             <tbody>
//               {dummyData.map((entry, index) => (
//                 <motion.tr
//                   key={index}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="border-t border-gray-100 hover:bg-purple-50/50 transition-colors"
//                 >
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-2">
//                       {entry.rank === 1 && <Trophy className="text-yellow-500" size={20} />}
//                       {entry.rank === 2 && <Medal className="text-gray-400" size={20} />}
//                       {entry.rank === 3 && <Award className="text-amber-600" size={20} />}
//                       {entry.rank > 3 && <span className="text-gray-500">{entry.rank}</span>}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold">
//                         {entry.name.charAt(0)}
//                       </div>
//                       <div>
//                         <div className="font-semibold">{entry.name}</div>
//                         <div className="text-sm text-gray-500">
//                           {entry.rank <= 3 && "Top Performer"}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-1">
//                       <Star size={16} className="text-yellow-500" />
//                       <span className="font-semibold">{entry.score}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">{entry.quizzesTaken}</td>
//                   <td className="px-6 py-4">
//                     <span className={`px-2 py-1 rounded-full text-sm ${
//                       entry.averageScore >= 90 ? 'bg-green-100 text-green-700' :
//                       entry.averageScore >= 70 ? 'bg-blue-100 text-blue-700' :
//                       'bg-orange-100 text-orange-700'
//                     }`}>
//                       {entry.averageScore}%
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-gray-500">{entry.lastActive}</td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
//         <motion.div
//           whileHover={{ scale: 1.02 }}
//           className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white"
//         >
//           <Crown className="mb-4" size={24} />
//           <h3 className="text-2xl font-bold mb-2">Total Participants</h3>
//           <p className="text-4xl font-bold">1,234</p>
//         </motion.div>
        
//         <motion.div
//           whileHover={{ scale: 1.02 }}
//           className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-6 text-white"
//         >
//           <Trophy className="mb-4" size={24} />
//           <h3 className="text-2xl font-bold mb-2">Quizzes Completed</h3>
//           <p className="text-4xl font-bold">5,678</p>
//         </motion.div>
        
//         <motion.div
//           whileHover={{ scale: 1.02 }}
//           className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white"
//         >
//           <Star className="mb-4" size={24} />
//           <h3 className="text-2xl font-bold mb-2">Avg. Score</h3>
//           <p className="text-4xl font-bold">85%</p>
//         </motion.div>
//       </div>
//     </div>
//   )
// } 


// 'use client'
// import { useEffect, useState } from 'react'
// import { motion } from 'framer-motion'
// import { Trophy, Medal, Award, Star, Crown } from 'lucide-react'
// import { client } from '@/lib/sanity'
// import { LeaderboardEntry, Stats } from '../types/types'

// const Leaderboard = ({ day }: { day: number }) => {
//   const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
//   const [stats, setStats] = useState<Stats>({
//     totalParticipants: 0,
//     quizzesCompleted: 0,
//     averageScore: 0,
//   })

//   useEffect(() => {
//     const fetchData = async () => {
//       // Fetch leaderboard data
//       const leaderboardQuery = `*[_type == "userData"]`
//       const leaderboardData = await client.fetch(leaderboardQuery)
//       setLeaderboardData(leaderboardData)
//     //   "averageScore": round(avg(*[_type == "userData" && day == ${day}].score))

//       // Fetch stats data
//       const statsQuery = `{
//         "totalParticipants": count(*[_type == "userData"]),
//         "quizzesCompleted": count(*[_type == "userData"]),
//          "averageScore": round(*[_type == "userData"])

//       }`
//       const statsData = await client.fetch(statsQuery)
//       setStats(statsData)
//     }
//     fetchData()
//   }, [day])

//   return (
//     <div className="container mx-auto py-24 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-center mb-12"
//       >
//         <h1 className="text-4xl font-bold mb-4">
//           <span className="text-purple-600">Python Masters</span> Leaderboard
//         </h1>
//         <p className="text-gray-600">Top performers in Python programming quizzes</p>
//       </motion.div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//         <motion.div
//           whileHover={{ scale: 1.02 }}
//           className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white"
//         >
//           <Crown className="mb-4" size={24} />
//           <h3 className="text-2xl font-bold mb-2">Total Participants</h3>
//           <p className="text-4xl font-bold">{stats.totalParticipants}</p>
//         </motion.div>

//         <motion.div
//           whileHover={{ scale: 1.02 }}
//           className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-6 text-white"
//         >
//           <Trophy className="mb-4" size={24} />
//           <h3 className="text-2xl font-bold mb-2">Quizzes Completed</h3>
//           <p className="text-4xl font-bold">{stats.quizzesCompleted}</p>
//         </motion.div>

//         <motion.div
//           whileHover={{ scale: 1.02 }}
//           className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white"
//         >
//           <Star className="mb-4" size={24} />
//           <h3 className="text-2xl font-bold mb-2">Avg. Score</h3>
//           <p className="text-4xl font-bold">{stats.averageScore}%</p>
//         </motion.div>
//       </div>

//       {/* Leaderboard Table */}
//       <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-purple-50">
//               <tr>
//                 <th className="px-6 py-4 text-left">Rank</th>
//                 <th className="px-6 py-4 text-left">User</th>
//                 <th className="px-6 py-4 text-left">Score</th>
//                 <th className="px-6 py-4 text-left">Day</th>
//                 <th className="px-6 py-4 text-left">Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leaderboardData.map((entry, index) => (
//                 <motion.tr
//                   key={entry._id}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="border-t border-gray-100 hover:bg-purple-50/50 transition-colors"
//                 >
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-2">
//                       {index === 0 && <Trophy className="text-yellow-500" size={20} />}
//                       {index === 1 && <Medal className="text-gray-400" size={20} />}
//                       {index === 2 && <Award className="text-amber-600" size={20} />}
//                       {index > 2 && <span className="text-gray-500">{index + 1}</span>}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold">
//                         {entry.userName.charAt(0)}
//                       </div>
//                       <div>
//                         <div className="font-semibold">{entry.userName}</div>
//                         <div className="text-sm text-gray-500">
//                           {index <= 2 && "Top Performer"}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-1">
//                       <Star size={16} className="text-yellow-500" />
//                       <span className="font-semibold">{entry.score}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">Day {entry.day}</td>
//                   <td className="px-6 py-4 text-gray-500">{new Date(entry.timestamp).toLocaleString()}</td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Leaderboard


'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Medal, Award, Star, Crown } from 'lucide-react'
import { client } from '@/lib/sanity'
import { LeaderboardEntry, Stats } from '../types/types'

const Leaderboard = ({ day }: { day: number }) => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [stats, setStats] = useState<Stats>({
    totalParticipants: 0,
    quizzesCompleted: 0,
    averageScore: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      // Fetch leaderboard data
      const leaderboardQuery = `*[_type == "userData"]`
      const leaderboardData = await client.fetch(leaderboardQuery)
      
      // Sort the leaderboard data by score in descending order
      const sortedData = leaderboardData.sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.score - a.score)
      setLeaderboardData(sortedData)

      // Fetch stats data
      const statsQuery = `{
        "totalParticipants": count(*[_type == "userData"]),
        "quizzesCompleted": count(*[_type == "userData"]),
         "averageScore": round(*[_type == "userData"])
      }`
      const statsData = await client.fetch(statsQuery)
      setStats(statsData)
    }
    fetchData()
  }, [day])

  return (
    <div className="container mx-auto py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-purple-600">Python Masters</span> Leaderboard
        </h1>
        <p className="text-gray-600">Top performers in Python programming quizzes</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white"
        >
          <Crown className="mb-4" size={24} />
          <h3 className="text-2xl font-bold mb-2">Total Participants</h3>
          <p className="text-4xl font-bold">{stats.totalParticipants}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-6 text-white"
        >
          <Trophy className="mb-4" size={24} />
          <h3 className="text-2xl font-bold mb-2">Quizzes Completed</h3>
          <p className="text-4xl font-bold">{stats.quizzesCompleted}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white"
        >
          <Star className="mb-4" size={24} />
          <h3 className="text-2xl font-bold mb-2">Avg. Score</h3>
          <p className="text-4xl font-bold">{stats.averageScore}%</p>
        </motion.div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-purple-50">
              <tr>
                <th className="px-6 py-4 text-left">Rank</th>
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">Score</th>
                <th className="px-6 py-4 text-left">Day</th>
                <th className="px-6 py-4 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry, index) => (
                <motion.tr
                  key={entry._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-t border-gray-100 hover:bg-purple-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {index === 0 && <Trophy className="text-yellow-500" size={20} />}
                      {index === 1 && <Medal className="text-gray-400" size={20} />}
                      {index === 2 && <Award className="text-amber-600" size={20} />}
                      {index > 2 && <span className="text-gray-500">{index + 1}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold">
                        {entry.userName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold">{entry.userName}</div>
                        <div className="text-sm text-gray-500">
                          {index <= 2 && "Top Performer"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-500" />
                      <span className="font-semibold">{entry.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">Day {entry.day}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(entry.timestamp).toLocaleString()}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard