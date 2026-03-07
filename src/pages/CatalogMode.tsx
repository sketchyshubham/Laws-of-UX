import { useState, useMemo, ChangeEvent } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Law } from '../types';
import lawsData from '../data/laws.json';
import { motion } from 'motion/react';

const categories = ['All', 'Bias', 'Law', 'Information', 'Meaning', 'Time', 'Memory'];

export default function CatalogMode() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const filteredLaws = useMemo(() => {
    return (lawsData as Law[]).filter((law) => {
      const matchesSearch = (law.title + law.summary).toLowerCase().includes(search.toLowerCase());
      
      let matchesCategory = true;
      if (selectedCategory === 'All') {
        matchesCategory = true;
      } else if (selectedCategory === 'Bias') {
        matchesCategory = law.title.toLowerCase().includes('bias');
      } else if (selectedCategory === 'Law') {
        matchesCategory = law.title.toLowerCase().includes('law');
      } else {
        matchesCategory = law.category === selectedCategory;
      }

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (selectedCategory !== 'All') {
      setSelectedCategory('All');
    }
  };

  const handleCardClick = (lawId: string) => {
    navigate('/', { state: { initialLawId: lawId } });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8 w-full">
      {/* Search and Filters */}
      <div className="space-y-6">
        <div className="relative group max-w-xl mx-auto">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-600 transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search principles..."
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-16 pr-8 py-4 bg-white/75 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all text-stone-900 placeholder:text-stone-400 font-light backdrop-blur-sm text-left"
          />
        </div>

        <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:justify-center no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 border ${
                selectedCategory === cat 
                  ? 'bg-stone-900 text-white border-stone-900 shadow-none' 
                  : 'bg-white/75 text-stone-500 border-white/20 hover:bg-white/90 backdrop-blur-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Laws Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {filteredLaws.map((law) => (
          <motion.div
            key={law.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleCardClick(law.id)}
            className="bg-white/75 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-none hover:bg-white/80 transition-all group cursor-pointer relative overflow-hidden active:scale-[0.98]"
          >
            {/* Gradient stroke effect from bottom up */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none opacity-50" />

            <div className="relative z-10 flex flex-col h-full">
              {/* First Line: Tags and Icon */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-medium uppercase tracking-wider text-stone-400 bg-stone-100/50 px-3 py-1 rounded-full border border-stone-200/50">
                  {law.category}
                </span>
                <div className="text-2xl leading-none">{law.emoji}</div>
              </div>

              {/* Second Line: Heading */}
              <h3 className="font-serif font-bold text-xl text-stone-900 mb-2 leading-tight">
                {law.title}
              </h3>

              {/* Third Line: Card Text */}
              <p className="text-sm text-stone-500 line-clamp-3 leading-relaxed font-light">
                {law.summary}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredLaws.length === 0 && (
        <div className="text-center py-20 bg-white/75 backdrop-blur-md rounded-3xl border border-dashed border-stone-300/50">
          <p className="text-stone-400 font-medium text-lg">No principles found matching your criteria.</p>
          <button 
            onClick={() => {setSearch(''); setSelectedCategory('All');}}
            className="mt-4 px-6 py-2 bg-white/40 border border-white/20 rounded-xl text-stone-600 font-bold hover:bg-white/60 transition-all shadow-none backdrop-blur-sm"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
