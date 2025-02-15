// types.ts
export interface Quiz {
    question: string
    options: string[]
    correctAnswer: number
  }
  
  export interface UserData {
    _id: string
    userName: string
    score: number
    day: number
    timestamp: string
  }
  
  export interface LeaderboardEntry {
    _id : number,
    rank: number
    userName: string
    score: number
    day: number
    timestamp: string
  }
  
  export interface Stats {
    totalParticipants: number
    quizzesCompleted: number
    averageScore: number
  }