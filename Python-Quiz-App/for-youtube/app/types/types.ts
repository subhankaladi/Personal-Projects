// // types.ts
// export interface Quiz {
//     question: string
//     options: string[]
//     correctAnswer: number
//   }
  
//   export interface UserData {
//     _id: string
//     userName: string
//     score: number
//     day: number
//     timestamp: string
//   }
  
//   export interface LeaderboardEntry {
//     _id : number,
//     rank: number
//     userName: string
//     score: number
//     day: number
//     timestamp: string
//   }
  
//   export interface Stats {
//     mostActiveUser: any
//     totalParticipants: number
//     quizzesCompleted: number
//     averageScore: number
//   }

export interface UserData {
  _id: string;
  userName: string;
  score: number;
  day: number;
  timestamp: string;
  quizzesAttempted: number; // Ensure this field exists in your data
}

export interface LeaderboardEntry {
  _id: number;
  rank: number;
  userName: string;
  score: number;
  day: number;
  timestamp: string;
  quizzesAttempted: number; // Ensure this field exists in your data
}

export interface Stats {
  totalParticipants: number;
  mostActiveUser: { userName: string; quizzesAttempted: number };
  quizzesCompleted: number; // Ensure this field is included
  averageScore: number;
}


// types/Note.ts
export interface Note {
  _id: string;
  title: string;
  class: string
  images?: {
    _type: 'image';
    asset: {
      _type: 'reference';
      _ref: string;
    };
  }[];
  description: string;
  date: string;
}