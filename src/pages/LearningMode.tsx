import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Shuffle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Law } from '../types';
import lawsData from '../data/laws.json';
import Flashcard from '../components/Flashcard';
import { motion, AnimatePresence } from 'motion/react';

export default function LearningMode() {
  const location = useLocation();
  const laws = lawsData as Law[];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (location.state?.initialLawId) {
      const index = laws.findIndex(law => law.id === location.state.initialLawId);
      if (index !== -1) {
        setCurrentIndex(index);
      }
      // Clear state so it doesn't persist on refresh/navigation
      window.history.replaceState({}, document.title);
    }
  }, [location.state, laws]);
  
  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % laws.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + laws.length) % laws.length);
  };

  const randomCard = () => {
    const randomIndex = Math.floor(Math.random() * laws.length);
    setCurrentIndex(randomIndex);
  };

  const currentLaw = laws[currentIndex];

  return (
    <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full md:gap-8 md:py-8">
      {/* Flashcard Display */}
      <div className="flex-1 flex flex-col items-center justify-start min-h-0 py-8 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLaw.id}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
            className="w-full h-full flex items-center justify-center perspective-1000"
          >
            <Flashcard law={currentLaw} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Controls Cluster */}
      <div className="mt-auto w-full flex flex-col gap-0">
        {/* Position Count */}
        <div className="flex-shrink-0 flex justify-center py-6">
          <span className="text-xs font-bold text-stone-400 tracking-widest uppercase">
            {currentIndex + 1} / {laws.length}
          </span>
        </div>

        {/* Navigation Controls */}
        <div className="flex-shrink-0 flex items-center justify-between gap-6 px-6 pb-10 md:pb-0">
          <button
            onClick={prevCard}
            className="p-4 rounded-2xl bg-white/75 border border-white/20 shadow-none hover:bg-white/90 transition-all text-stone-500 hover:text-stone-900 backdrop-blur-sm"
            aria-label="Previous card"
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>

          <button
            onClick={randomCard}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/75 text-stone-500 text-xs font-bold uppercase tracking-wider hover:bg-white/90 hover:text-stone-700 transition-colors border border-white/20 backdrop-blur-sm"
          >
            <Shuffle size={14} />
            Shuffle
          </button>

          <button
            onClick={nextCard}
            className="p-4 rounded-2xl bg-stone-900 text-white shadow-none hover:scale-105 hover:bg-stone-800 transition-all"
            aria-label="Next card"
          >
            <ChevronRight size={24} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
