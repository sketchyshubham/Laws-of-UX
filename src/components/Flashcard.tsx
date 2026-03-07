import { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, RotateCw } from 'lucide-react';
import { Law } from '../types';

interface FlashcardProps {
  law: Law;
}

const Flashcard = ({ law }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full h-full max-h-[60vh] md:max-h-none md:h-[420px] aspect-[3/4] md:aspect-auto perspective-1000 group" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="relative w-full h-full text-center transition-all duration-500 transform-style-3d cursor-pointer"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 w-full h-full bg-white/75 backdrop-blur-md rounded-3xl border border-white/20 shadow-none p-9 flex flex-col items-center justify-center hover:bg-white/80 transition-all duration-300 overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Gradient stroke effect from bottom up */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none opacity-50" />
          
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
            <div className="absolute top-6 right-6 text-stone-300">
              <RotateCw size={20} />
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-6xl mb-9 bg-white/30 p-6 rounded-2xl shadow-inner backdrop-blur-sm">{law.emoji}</div>
              <h3 className="font-serif text-3xl font-bold text-stone-900 mb-6 tracking-tight">{law.title}</h3>
              <p className="font-sans text-stone-500 text-lg leading-relaxed max-w-md mx-auto">{law.summary}</p>
            </div>
            
            <div className="mt-9">
              <span className="inline-block px-4 py-1.5 bg-white/30 text-stone-600 text-xs font-bold rounded-full uppercase tracking-widest border border-white/20 backdrop-blur-sm">
                {law.category}
              </span>
            </div>
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 w-full h-full bg-stone-900/90 backdrop-blur-md text-white rounded-3xl shadow-none p-9 flex flex-col items-center justify-center border border-white/10"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex-1 flex flex-col items-center justify-center">
            <h4 className="font-sans text-xs font-bold text-stone-400 uppercase tracking-[0.2em] mb-8">Practical Application</h4>
            <p className="font-serif text-2xl font-medium leading-relaxed mb-9 max-w-md mx-auto">"{law.tip}"</p>
          </div>
          
          <a
            href={`https://www.google.com/search?q=how+to+use+${law.title}+in+UX+design`}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-4 px-8 py-5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95 font-sans"
          >
            Dive Deeper <ExternalLink size={16} />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Flashcard;
