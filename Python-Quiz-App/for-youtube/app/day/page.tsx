"use client"

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap'; 

interface DayCardProps {
  day: number; 
}

const Days = () => {
  // Array to store days from 1 to 20
  const days = Array.from({ length: 20 }, (_, i) => i + 1);

  

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-purple-100 to-white">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-purple-600 text-center mb-12">
          Daily Python Quizzes
        </h1>
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
  const cardRef = useRef<HTMLDivElement>(null); // Ref for the card element

  // GSAP Animation on Hover
  useEffect(() => {
    const card = cardRef.current;

    if (card) {
      // Hover animation
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          scale: 1.05,
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
          duration: 0.3,
        });
      });

      // Reset animation on mouse leave
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

export default Days;