'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Star, Crown } from 'lucide-react';
import { client } from '@/lib/sanity';
import { LeaderboardEntry, Stats } from '../types/types';
const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalParticipants: 0,
    mostActiveUser: { userName: '', quizzesAttempted: 0 },
    quizzesCompleted: 0, // Initialize quizzesCompleted
    averageScore: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const leaderboardQuery = `*[_type == "userData"]`;
      const data = await client.fetch(leaderboardQuery);
      
      // Sort data by score in descending order
      const sortedData = data.sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.score - a.score);
      setLeaderboardData(sortedData);

      // Calculate stats
      const totalParticipants = sortedData.length;
      const totalScore = sortedData.reduce((acc: number, entry: LeaderboardEntry) => acc + entry.score, 0);
      const avgScore = totalScore / totalParticipants || 0; // Avoid division by zero

      // Get most active user (assuming you have a field for quizzes attempted)
      const mostActiveUser = sortedData.reduce((prev: LeaderboardEntry, current: LeaderboardEntry) => {
        return (prev.quizzesAttempted > current.quizzesAttempted) ? prev : current;
      }, { userName: 'N/A', quizzesAttempted: 0 });

      // Calculate total quizzes completed
      const quizzesCompleted = sortedData.reduce((acc: number, entry: LeaderboardEntry) => acc + entry.quizzesAttempted, 0);

      setStats({
        totalParticipants,
        mostActiveUser: { userName: mostActiveUser.userName, quizzesAttempted: mostActiveUser.quizzesAttempted },
        quizzesCompleted, // Include quizzesCompleted
        averageScore: avgScore,
      });
    };

    fetchData();
  }, []);

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
          className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white"
        >
          <h3 className="text-2xl font-bold mb-2">Most Active User</h3>
          <p className="text-4xl font-bold">{stats.mostActiveUser.userName}</p>
          <p className="text-lg">Quizzes Attempted: {stats.mostActiveUser.quizzesAttempted}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-6 text-white"
        >
          <Star className="mb-4" size={24} />
          <h3 className="text-2xl font-bold mb-2">Avg. Score</h3>
          <p className="text-4xl font-bold">{stats.averageScore.toFixed(2)}%</p>
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
  );
};

export default Leaderboard;

































// 'use client';
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Trophy, Medal, Award, Star, Crown } from 'lucide-react';
// import { client } from '@/lib/sanity';
// import { LeaderboardEntry, Stats } from '../types/types';

// const Leaderboard = () => {
//   const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
//   const [stats, setStats] = useState<Stats>({
//     totalParticipants: 0,
//     quizzesCompleted: 0,
//     averageScore: 0,
//   });
//   const [averageScore, setAverageScore] = useState<number>(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       const leaderboardQuery = `*[_type == "userData"]`;
//       const data = await client.fetch(leaderboardQuery);
      
//       // Sort data by score in descending order
//       const sortedData = data.sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.score - a.score);
//       setLeaderboardData(sortedData);

//       // Calculate average score
//       const totalScore = sortedData.reduce((acc: number, entry: LeaderboardEntry) => acc + entry.score, 0);
//       const avgScore = totalScore / sortedData.length || 0; // Avoid division by zero
//       setAverageScore(avgScore);

//       // Fetch stats data
//       const statsQuery = `{
//         "totalParticipants": count(*[_type == "userData"]),
//         "quizzesCompleted": count(*[_type == "userData"]),
//          "averageScore": round(*[_type == "userData"])
//       }`;
//       const statsData = await client.fetch(statsQuery);
//       setStats(statsData);
//     };

//     fetchData();
//   }, []);

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
//           <p className="text-4xl font-bold">{averageScore.toFixed(2)}%</p>
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
//   );
// };

// export default Leaderboard;