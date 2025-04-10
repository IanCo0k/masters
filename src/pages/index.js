import { useState } from 'react'
import TeamsDisplay from './components/TeamsDisplay'

export default function Home() {
  const [showLegend, setShowLegend] = useState(false);

  return (
    <main className="min-h-screen bg-[#0a0f1c] text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Legend Button */}


        {/* Leaderboard */}
        <TeamsDisplay />
      </div>

      {/* Scoring Legend Modal */}
      {showLegend && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0f1c]/95 border-2 border-masters-yellow rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-masters-yellow">Scoring Rules</h2>
                <button
                  onClick={() => setShowLegend(false)}
                  className="text-white hover:text-masters-yellow transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Standard Scoring */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Scoring Rules</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-masters-green/10">
                      <span className="text-gray-300">Albatross/Hole in One</span>
                      <span className="font-bold text-masters-yellow">+20 points</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-masters-green/10">
                      <span className="text-gray-300">Eagle</span>
                      <span className="font-bold text-masters-yellow">+5 points</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-masters-green/10">
                      <span className="text-gray-300">Birdie</span>
                      <span className="font-bold text-masters-yellow">+2 points</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-masters-green/10">
                      <span className="text-gray-300">Par</span>
                      <span className="font-bold text-masters-yellow">+1 point</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-masters-green/10">
                      <span className="text-gray-300">Bogey</span>
                      <span className="font-bold text-red-400">-1 point</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-masters-green/10">
                      <span className="text-gray-300">Double Bogey</span>
                      <span className="font-bold text-red-400">-3 points</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-masters-green/10">
                      <span className="text-gray-300">Triple or Worse</span>
                      <span className="font-bold text-red-400">-5 points</span>
                    </div>
                  </div>
                </div>

                {/* Additional Scoring */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Additional Scoring</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-masters-green/10">
                      <span className="text-gray-300">Make Cut</span>
                      <span className="font-bold text-masters-yellow">+15 points</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-masters-green/10">
                      <span className="text-gray-300">Total Day Under Par</span>
                      <span className="font-bold text-masters-yellow">+5 points</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-masters-green/10">
                      <span className="text-gray-300">Total Day Over Par</span>
                      <span className="font-bold text-red-400">-5 points</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-masters-green/10">
                      <span className="text-gray-300">Lowest Round of Day</span>
                      <span className="font-bold text-masters-yellow">+10 points</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-masters-green/10">
                      <span className="text-gray-300">Top 10 Finish</span>
                      <span className="font-bold text-masters-yellow">+15 points</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-masters-green/10">
                      <span className="text-gray-300">Top 5 Finish</span>
                      <span className="font-bold text-masters-yellow">+25 points</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-masters-green/10">
                      <span className="text-gray-300">Win the Masters</span>
                      <span className="font-bold text-masters-yellow">+50 points</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
