"use client"

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

interface DayCardProps {
  day: number;
}

interface LevelCardProps {
  level: number;
  difficulty: string;
}

const Days = () => {
  // Array to store days from 1 to 20
  const days = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen mt-10 py-12 bg-gradient-to-b from-purple-100 to-white">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-purple-600 text-center mb-12">
          Python Learning Path
        </h1>
        
        {/* Level Sections */}
        <div className="space-y-8 mb-16">
          {/* Basic Level */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-blue-600 mb-6 border-b-2 border-blue-200 pb-2">
              Basic Level
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((level) => (
                <LevelCard key={`basic-${level}`} level={level} difficulty="basic" />
              ))}
            </div>
          </div>

          {/* Intermediate Level */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-green-600 mb-6 border-b-2 border-green-200 pb-2">
              Intermediate Level
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((level) => (
                <LevelCard key={`intermediate-${level}`} level={level} difficulty="intermediate" />
              ))}
            </div>
          </div>

          {/* Advanced Level */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-red-600 mb-6 border-b-2 border-red-200 pb-2">
              Advanced Level
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((level) => (
                <LevelCard key={`advanced-${level}`} level={level} difficulty="advanced" />
              ))}
            </div>
          </div>
        </div>

        {/* Days Section */}
        <h2 className="text-4xl font-bold text-purple-600 text-center mb-8">
          Daily Python Quizzes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {days.map((day) => (
            <DayCard key={day} day={day} />
          ))}
        </div>
      </div>
    </div>
  );
};

const DayCard: React.FC<DayCardProps> = ({ day }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;

    if (card) {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          scale: 1.05,
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
          duration: 0.3,
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
          duration: 0.3,
        });
      });
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="p-6 bg-white rounded-xl shadow-lg cursor-pointer"
    >
      <Link href={`/day/${day}`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Day {day}</h2>
          <p className="text-gray-600">Start your Python quiz for Day {day}</p>
        </div>
      </Link>
    </div>
  );
};

const LevelCard: React.FC<LevelCardProps> = ({ level, difficulty }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;

    if (card) {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -5,
          scale: 1.03,
          boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.15)',
          duration: 0.2,
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
          duration: 0.2,
        });
      });
    }
  }, []);

  const colors = {
    basic: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      border: 'border-blue-200'
    },
    intermediate: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      border: 'border-green-200'
    },
    advanced: {
      bg: 'bg-red-100',
      text: 'text-red-600',
      border: 'border-red-200'
    }
  };

  return (
    <div
      ref={cardRef}
      className={`p-4 ${colors[difficulty as keyof typeof colors].bg} rounded-lg shadow-md cursor-pointer border ${colors[difficulty as keyof typeof colors].border}`}
    >
      <Link href={`/quiz/${difficulty}/level${level}`}>
        <div className="text-center">
          <h2 className={`text-xl font-bold ${colors[difficulty as keyof typeof colors].text} mb-2`}>
            Level {level}
          </h2>
          <p className="text-gray-600 capitalize">{difficulty}</p>
        </div>
      </Link>
    </div>
  );
};

export default Days;