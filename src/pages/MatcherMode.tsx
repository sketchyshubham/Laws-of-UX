import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Lightbulb } from 'lucide-react';
import { getGeminiSuggestion } from '../utils/gemini';
import { Law, GeminiResponse } from '../types';
import lawsData from '../data/laws.json';
import Loader from '../components/Loader';

const laws = lawsData as Law[];

export default function MatcherMode() {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<GeminiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSuggest = async () => {
    if (!userInput.trim()) return;

    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    try {
      const result = await getGeminiSuggestion(userInput, laws);
      setSuggestion(result);
    } catch (err) {
      console.error(err);
      setError("Failed to get suggestions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getLawById = (id: string) => laws.find(l => l.id === id);

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-2 px-4">
      {/* Input Section */}
      <div className="bg-white/75 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-none relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Supercharge your designs. Describe your screen
            </h2>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="e.g. A checkout screen for a luxury fashion app targeting millennials who value speed and exclusivity..."
              className="w-full p-6 bg-white/75 border border-white/20 rounded-2xl focus:ring-2 focus:ring-stone-900 focus:outline-none text-stone-900 font-light min-h-[120px] resize-y placeholder:text-stone-400 backdrop-blur-sm transition-all"
            />
          </div>

          <button
            onClick={handleSuggest}
            disabled={isLoading || !userInput.trim()}
            className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
          >
            {isLoading ? (
              <span>Thinking...</span>
            ) : (
              <>
                <Sparkles size={18} className="group-hover:scale-110 transition-transform" />
                <span>Suggest UX Laws</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex justify-center py-12"
        >
          <Loader />
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 text-red-600 rounded-xl text-center border border-red-100"
        >
          {error}
        </motion.div>
      )}

      {/* Results */}
      <AnimatePresence>
        {suggestion && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Core Strategy Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-stone-900 text-white p-8 rounded-3xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3 text-yellow-200">
                  <Lightbulb size={20} />
                  <span className="font-serif font-bold uppercase tracking-wider text-sm">Core Strategy</span>
                </div>
                <p className="text-lg md:text-xl font-serif leading-relaxed text-white/90">
                  {suggestion.coreSuggestion}
                </p>
              </div>
            </motion.div>

            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="font-serif text-xl font-bold text-stone-900">Recommended Principles</h3>
                <span className="px-3 py-1 bg-white/75 backdrop-blur-sm border border-white/20 rounded-full text-xs font-bold text-stone-500 uppercase tracking-wide">
                  {suggestion.relevantLaws.length} Matches
                </span>
              </div>

              <div className="grid gap-4">
                {suggestion.relevantLaws.map((item, index) => {
                  const law = getLawById(item.id);
                  if (!law) return null;

                  return (
                    <motion.div
                      key={law.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white/75 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-none hover:bg-white/80 transition-all flex flex-col gap-6 group relative overflow-hidden"
                    >
                      {/* Gradient stroke effect from bottom up */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none opacity-50" />

                      <div className="relative z-10 flex flex-col h-full">
                        {/* First Line: Tags and Icon */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-medium uppercase tracking-wider text-stone-400 bg-stone-100/50 px-3 py-1 rounded-full border border-stone-200/50">
                            {law.category}
                          </span>
                          <div className="text-2xl leading-none group-hover:scale-110 transition-transform duration-300">{law.emoji}</div>
                        </div>

                        {/* Second Line: Heading */}
                        <h4 className="font-serif font-bold text-xl text-stone-900 mb-3 leading-tight">
                          {law.title}
                        </h4>

                        {/* Contextual Usage */}
                        <div className="mb-4 pl-4 border-l-2 border-stone-200">
                          <p className="text-stone-600 text-sm italic leading-relaxed">
                            "{item.contextualUsage}"
                          </p>
                        </div>

                        {/* Summary */}
                        <p className="text-xs text-stone-400 leading-relaxed font-light">
                          {law.summary}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
