import { useState, useEffect } from 'react';

const teamsData = [
  {
    teamName: "Ian Cook",
    managerName: "Ian Cook",
    managerImage: "./ian.png",
    golfer1Name: "Hideki Matsuyama",
    golfer1Image: "https://a.espncdn.com/combiner/i?img=/i/headshots/golf/players/full/5860.png&w=350&h=254",
    golfer2Name: "Collin Morikawa",
    golfer2Image: "https://a.espncdn.com/combiner/i?img=/i/headshots/golf/players/full/10592.png&w=350&h=254",
    totalScore: 0,
    index: 0,
    key: 0
  },
  {
    teamName: "Evan Hovingh",
    managerName: "Evan Hovingh",
    managerImage: "./evan.png",
    golfer1Name: "Xander Schauffele",
    golfer1Image: "https://a.espncdn.com/combiner/i?img=/i/headshots/golf/players/full/10140.png&w=350&h=254",
    golfer2Name: "Tommy Fleetwood",
    golfer2Image: "https://b.fssta.com/uploads/application/golf/headshots/3672.vresize.350.350.medium.76.png",
    totalScore: 0,
    index: 1,
    key: 1
  },
  {
    teamName: "Matt Gillette",
    managerName: "Matt Gillette",
    managerImage: "./matt.png",
    golfer1Name: "Viktor Hovland",
    golfer1Image: "https://b.fssta.com/uploads/application/golf/headshots/11612.vresize.350.350.medium.9.png",
    golfer2Name: "Rory McIlroy",
    golfer2Image: "https://b.fssta.com/uploads/application/golf/headshots/380.vresize.350.350.medium.79.png",
    totalScore: 0,
    index: 2,
    key: 2
  },
  {
    teamName: "Nick Martin",
    managerName: "Nick Martin",
    managerImage: "./nick.png",
    golfer1Name: "Scottie Scheffler",
    golfer1Image: "https://a.espncdn.com/combiner/i?img=/i/headshots/golf/players/full/9478.png&w=350&h=254",
    golfer2Name: "Min Woo Lee",
    golfer2Image: "https://a.espncdn.com/combiner/i?img=/i/headshots/golf/players/full/4410932.png&w=350&h=254",
    totalScore: 0,
    index: 3,
    key: 3
  },
  {
    teamName: "Chet Huls",
    managerName: "Chet Huls",
    managerImage: "./chet.png",
    golfer1Name: "Bryson DeChambeau",
    golfer1Image: "https://a.espncdn.com/combiner/i?img=/i/headshots/golf/players/full/10046.png&w=350&h=254",
    golfer2Name: "Ludvig Åberg",
    golfer2Image: "https://a.espncdn.com/combiner/i?img=/i/headshots/golf/players/full/4375972.png&w=350&h=254",
    totalScore: 0,
    index: 4,
    key: 4
  }
];

// Augusta National hole pars
const augustaHolePars = [4, 5, 4, 3, 4, 3, 4, 5, 4, 4, 4, 3, 5, 4, 5, 3, 4, 4];

const TeamsDisplay = () => {
  const [sortedTeams, setSortedTeams] = useState([]);
  const [expandedTeam, setExpandedTeam] = useState(null);
  const [playerData, setPlayerData] = useState({});
  const [selectedRound, setSelectedRound] = useState(null);
  const [lowestRounds, setLowestRounds] = useState({
    round1: null,
    round2: null,
    round3: null,
    round4: null
  });

  useEffect(() => {
    // Sort teams by score (highest to lowest) or alphabetically if scores are equal
    const sorted = [...teamsData].map(team => ({
      ...team,
      totalScore: calculateTeamScore(team)
    })).sort((a, b) => {
      if (b.totalScore !== a.totalScore) {
        return b.totalScore - a.totalScore;
      }
      // If scores are equal, sort by last name
      const aLastName = a.teamName.split(' ').pop();
      const bLastName = b.teamName.split(' ').pop();
      return aLastName.localeCompare(bLastName);
    });
    setSortedTeams(sorted);
  }, [playerData]);

  useEffect(() => {
    // Fetch initial player data and determine lowest rounds
    const fetchDataAndProcessLowestRounds = async () => {
      try {
        const response = await fetch("https://www.masters.com/en_US/scores/feeds/2025/scores.json");
        const data = await response.json();
        const players = {};
        const roundTotals = {
          round1: [],
          round2: [],
          round3: [],
          round4: []
        };
        
        // Process all players to find lowest rounds
        data.data.player.forEach(player => {
          ['round1', 'round2', 'round3', 'round4'].forEach(round => {
            if (player[round] && player[round].total) {
              roundTotals[round].push(player[round].total);
            }
          });
        });
        
        // Find lowest score for each round
        const lowest = {
          round1: Math.min(...roundTotals.round1),
          round2: Math.min(...roundTotals.round2),
          round3: Math.min(...roundTotals.round3),
          round4: Math.min(...roundTotals.round4)
        };
        
        setLowestRounds(lowest);
        
        // Process team players
        teamsData.forEach(team => {
          const golfer1 = data.data.player.find(p => p.full_name === team.golfer1Name);
          const golfer2 = data.data.player.find(p => p.full_name === team.golfer2Name);
          players[team.golfer1Name] = golfer1 || null;
          players[team.golfer2Name] = golfer2 || null;
        });
        
        setPlayerData(players);
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    };
    
    fetchDataAndProcessLowestRounds();
  }, []);

  const calculateRoundScore = (scores, pars, player, roundNumber) => {
    if (!scores) return { total: 0, breakdown: [] };
    let roundScore = 0;
    let totalOverUnder = 0;
    let breakdown = [];
    
    // Per-hole scoring
    scores.forEach((score, index) => {
      if (score === null) return;
      const par = pars[index];
      totalOverUnder += score - par;
      
      let points = 0;
      let reason = '';
      
      if (score === 1) {
        points = 20;
        reason = 'Hole in One/Albatross';
      } else if (score === par - 2) {
        points = 5;
        reason = 'Eagle';
      } else if (score === par - 1) {
        points = 2;
        reason = 'Birdie';
      } else if (score === par) {
        points = 1;
        reason = 'Par';
      } else if (score === par + 1) {
        points = -1;
        reason = 'Bogey';
      } else if (score === par + 2) {
        points = -3;
        reason = 'Double Bogey';
      } else {
        points = -5;
        reason = 'Triple Bogey or Worse';
      }
      
      roundScore += points;
      if (points !== 0) {
        breakdown.push({ points, reason, hole: index + 1 });
      }
    });
    
    // Add bonus for total round under/over par
    const allHolesCompleted = scores.every(score => score !== null);
    if (allHolesCompleted) {
      if (totalOverUnder < 0) {
        roundScore += 5;
        breakdown.push({ points: 5, reason: 'Total Day Under Par' });
      } else if (totalOverUnder > 0) {
        roundScore -= 5;
        breakdown.push({ points: -5, reason: 'Total Day Over Par' });
      }
    }
    
    // Check for lowest round of the day
    const lowestRoundBonus = checkLowestRound(totalOverUnder, roundNumber, scores);
    if (lowestRoundBonus.points > 0) {
      roundScore += lowestRoundBonus.points;
      breakdown.push(lowestRoundBonus);
    }
    
    // Check for cut made after round 2
    if (roundNumber === 2) {
      const madeCut = checkMadeCut(player);
      if (madeCut) {
        roundScore += 15;
        breakdown.push({ points: 15, reason: 'Made the Cut' });
      }
    }
    
    // Check for final position bonuses after round 4
    if (roundNumber === 4) {
      const finalPosition = checkFinalPosition(player);
      if (finalPosition.points > 0) {
        roundScore += finalPosition.points;
        breakdown.push(finalPosition);
      }
    }
    
    return { total: roundScore, breakdown };
  };

  const checkMadeCut = (player) => {
    // Only award cut bonus if player has started round 3 (meaning they made the cut)
    if (player.round3 && player.round3.scores && player.round3.scores.some(score => score !== null)) {
      return true;
    }
    return false;
  };

  const checkFinalPosition = (player) => {
    // Only check final position if tournament is complete (all players have finished round 4)
    if (!player.pos || !player.round4 || !player.round4.scores || 
        player.round4.scores.some(score => score === null)) {
      return { points: 0, reason: '' };
    }
    
    const position = parseInt(player.pos);
    if (position === 1) return { points: 50, reason: 'Won the Masters' };
    if (position <= 5) return { points: 25, reason: 'Top 5 Finish' };
    if (position <= 10) return { points: 15, reason: 'Top 10 Finish' };
    return { points: 0, reason: '' };
  };

  const checkLowestRound = (roundScore, roundNumber, scores) => {
    // Only check for lowest round if all 18 holes are completed
    if (!scores || scores.some(score => score === null)) {
      return { points: 0, reason: '' };
    }

    if (lowestRounds[`round${roundNumber}`] === roundScore) {
      return { points: 10, reason: 'Lowest Round of Day' };
    }
    return { points: 0, reason: '' };
  };

  const calculateTeamScore = (team) => {
    const golfer1 = playerData[team.golfer1Name];
    const golfer2 = playerData[team.golfer2Name];
    let totalScore = 0;

    if (golfer1) {
      ['round1', 'round2', 'round3', 'round4'].forEach((round, idx) => {
        if (golfer1[round] && golfer1[round].scores) {
          const roundScore = calculateRoundScore(golfer1[round].scores, augustaHolePars, golfer1, idx + 1);
          totalScore += roundScore.total;
        }
      });
    }

    if (golfer2) {
      ['round1', 'round2', 'round3', 'round4'].forEach((round, idx) => {
        if (golfer2[round] && golfer2[round].scores) {
          const roundScore = calculateRoundScore(golfer2[round].scores, augustaHolePars, golfer2, idx + 1);
          totalScore += roundScore.total;
        }
      });
    }

    return totalScore;
  };

  const renderRoundDetails = (golferName, golferImage) => {
    const player = playerData[golferName];
    if (!player) return null;

    const rounds = ['round1', 'round2', 'round3', 'round4'];

    return (
      <div className="bg-masters-green/30 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-masters-yellow/30">
            <img src={golferImage} alt={golferName} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-white font-semibold">{golferName}</h3>
            <p className="text-masters-yellow text-sm">
              {player.pos ? `Position: ${player.pos} (${player.topar})` : 'Not started'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {rounds.map((round, idx) => {
            const roundData = player[round];
            const roundScore = calculateRoundScore(roundData?.scores, augustaHolePars, player, idx + 1);
            
            return (
              <button
                key={round}
                onClick={() => {
                  if (roundData) {
                    setSelectedRound({ player, round: idx + 1, roundData, golferName, golferImage });
                  }
                }}
                className={`bg-black/20 rounded-lg p-3 text-left transition-all duration-300 ${
                  roundData ? 'hover:bg-black/30 cursor-pointer' : 'cursor-not-allowed'
                }`}
              >
                <h4 className="text-masters-yellow text-sm font-semibold mb-2">Round {idx + 1}</h4>
                <div className="text-white text-lg font-bold">
                  {roundData ? (
                    <>
                      <span className={roundScore.total > 0 ? 'text-masters-yellow' : roundScore.total < 0 ? 'text-red-400' : 'text-white'}>
                        {roundScore.total > 0 ? `+${roundScore.total}` : roundScore.total}
                      </span>
                      <span className="text-sm text-gray-400 ml-2">pts</span>
                    </>
                  ) : (
                    <span className="text-sm text-gray-400">Not started</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const getScoreClass = (score, par) => {
    if (score === null) return 'text-gray-500';
    if (score === 1) return 'text-masters-yellow font-bold'; // Hole in one
    if (score === par - 2) return 'text-masters-yellow'; // Eagle
    if (score === par - 1) return 'text-red-400'; // Birdie
    if (score === par) return 'text-white'; // Par
    if (score === par + 1) return 'text-blue-400'; // Bogey
    return 'text-blue-600'; // Double bogey or worse
  };

  const getScoreName = (score, par) => {
    if (score === null) return '-';
    if (score === 1) return 'HOLE IN ONE!';
    if (score === par - 2) return 'Eagle';
    if (score === par - 1) return 'Birdie';
    if (score === par) return 'Par';
    if (score === par + 1) return 'Bogey';
    if (score === par + 2) return 'Double Bogey';
    return 'Triple+';
  };

  const getScorePoints = (score, par) => {
    if (score === null) return 0;
    if (score === 1) return 20; // Hole in one/Albatross
    if (score === par - 2) return 5; // Eagle
    if (score === par - 1) return 2; // Birdie
    if (score === par) return 1; // Par
    if (score === par + 1) return -1; // Bogey
    if (score === par + 2) return -3; // Double Bogey
    return -5; // Triple bogey or worse
  };

  return (
    <div className="w-full">
      {/* Scoring Legend */}
      <div className="bg-masters-green/30 backdrop-blur-sm border border-masters-yellow/20 rounded-xl p-3 mb-4">
        <h3 className="text-masters-yellow font-semibold text-sm mb-2">Scoring Legend</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 text-xs">
          <div className="bg-black/20 rounded p-1.5 text-center">
            <div className="text-masters-yellow font-bold">+20</div>
            <div className="text-gray-300">Hole in One</div>
          </div>
          <div className="bg-black/20 rounded p-1.5 text-center">
            <div className="text-masters-yellow font-bold">+5</div>
            <div className="text-gray-300">Eagle</div>
          </div>
          <div className="bg-black/20 rounded p-1.5 text-center">
            <div className="text-masters-yellow font-bold">+2</div>
            <div className="text-gray-300">Birdie</div>
          </div>
          <div className="bg-black/20 rounded p-1.5 text-center">
            <div className="text-white font-bold">+1</div>
            <div className="text-gray-300">Par</div>
          </div>
          <div className="bg-black/20 rounded p-1.5 text-center">
            <div className="text-red-400 font-bold">-1</div>
            <div className="text-gray-300">Bogey</div>
          </div>
          <div className="bg-black/20 rounded p-1.5 text-center">
            <div className="text-red-400 font-bold">-3</div>
            <div className="text-gray-300">Double</div>
          </div>
          <div className="bg-black/20 rounded p-1.5 text-center">
            <div className="text-red-400 font-bold">-5</div>
            <div className="text-gray-300">Triple+</div>
          </div>
        </div>
      </div>

      {/* Leaderboard Header */}
      <div className="bg-masters-green/30 backdrop-blur-sm border border-masters-yellow/20 rounded-t-xl p-3 sm:p-4 mb-1">
        <div className="grid grid-cols-8 sm:grid-cols-12 gap-2 sm:gap-4 items-center text-masters-yellow font-semibold text-sm sm:text-base">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-5 sm:col-span-3">PLAYER</div>
          <div className="hidden sm:block sm:col-span-6">TEAM</div>
          <div className="col-span-2 text-center">SCORE</div>
        </div>
      </div>

      {/* Leaderboard Rows */}
      <div className="space-y-1">
        {sortedTeams.map((team, index) => (
          <div key={team.key}>
            <div 
              onClick={() => setExpandedTeam(expandedTeam === team.key ? null : team.key)}
              className="bg-masters-green/20 hover:bg-masters-green/30 backdrop-blur-sm border border-masters-yellow/10 
                       hover:border-masters-yellow/20 rounded-lg p-3 sm:p-4 transition-all duration-300 cursor-pointer"
            >
              {/* Mobile Layout */}
              <div className="sm:hidden space-y-3">
                {/* Header with Position, Name, Score */}
                <div className="grid grid-cols-8 gap-2 items-center">
                  <div className="col-span-1 text-center">
                    <span className="text-lg font-bold text-white">{index + 1}</span>
                  </div>
                  <div className="col-span-5">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full border border-masters-yellow/30 overflow-hidden flex-shrink-0">
                        <img 
                          src={team.managerImage} 
                          alt={team.managerName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-white font-semibold text-sm truncate">{team.teamName}</span>
                    </div>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className={`text-lg font-bold ${
                      team.totalScore > 0 ? 'text-masters-yellow' : 
                      team.totalScore < 0 ? 'text-red-400' : 
                      'text-white'
                    }`}>
                      {team.totalScore > 0 ? `+${team.totalScore}` : team.totalScore}
                    </span>
                  </div>
                </div>

                {/* Golfers */}
                <div className="grid grid-cols-2 gap-2 px-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full border border-masters-yellow/30 overflow-hidden">
                      <img 
                        src={team.golfer1Image} 
                        alt={team.golfer1Name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-gray-300 text-xs">{team.golfer1Name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full border border-masters-yellow/30 overflow-hidden">
                      <img 
                        src={team.golfer2Image} 
                        alt={team.golfer2Name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-gray-300 text-xs">{team.golfer2Name}</span>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:grid sm:grid-cols-12 gap-4 items-center">
                <div className="col-span-1 text-center">
                  <span className="text-xl font-bold text-white">{index + 1}</span>
                </div>
                <div className="col-span-3 flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full border-2 border-masters-yellow/30 overflow-hidden">
                    <img 
                      src={team.managerImage} 
                      alt={team.managerName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-white font-semibold">{team.teamName}</span>
                </div>
                <div className="col-span-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full border border-masters-yellow/30 overflow-hidden">
                        <img 
                          src={team.golfer1Image} 
                          alt={team.golfer1Name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-gray-300 text-sm">{team.golfer1Name}</span>
                    </div>
                    <span className="text-gray-500">&</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full border border-masters-yellow/30 overflow-hidden">
                        <img 
                          src={team.golfer2Image} 
                          alt={team.golfer2Name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-gray-300 text-sm">{team.golfer2Name}</span>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 text-center">
                  <span className={`text-2xl font-bold ${
                    team.totalScore > 0 ? 'text-masters-yellow' : 
                    team.totalScore < 0 ? 'text-red-400' : 
                    'text-white'
                  }`}>
                    {team.totalScore > 0 ? `+${team.totalScore}` : team.totalScore}
                  </span>
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            <div 
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expandedTeam === team.key ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="mt-1 space-y-1 animate-fadeIn">
                {renderRoundDetails(team.golfer1Name, team.golfer1Image)}
                {renderRoundDetails(team.golfer2Name, team.golfer2Image)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Round Details Modal */}
      {selectedRound && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={() => setSelectedRound(null)}
        >
          <div 
            className="bg-[#1a1f2c] border border-masters-yellow/20 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-masters-yellow">
                    <img 
                      src={selectedRound.golferImage} 
                      alt={selectedRound.golferName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">{selectedRound.golferName}</h2>
                    <p className="text-masters-yellow">Round {selectedRound.round}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRound(null)}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Scorecard */}
              <div className="space-y-4 sm:space-y-6">
                {/* Front 9 */}
                <div className="overflow-x-auto">
                  <h3 className="text-masters-yellow font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Front Nine</h3>
                  <div className="grid grid-cols-9 gap-1 sm:gap-2 min-w-[600px]">
                    {[...Array(9)].map((_, i) => {
                      const score = selectedRound.roundData.scores[i];
                      const par = augustaHolePars[i];
                      const points = getScorePoints(score, par);
                      
                      return (
                        <div 
                          key={i}
                          className="bg-masters-green/20 rounded-lg p-2 sm:p-3 text-center"
                        >
                          <div className="text-gray-400 text-xs sm:text-sm mb-1">Hole {i + 1}</div>
                          <div className="text-gray-300 text-xs mb-1 sm:mb-2">Par {par}</div>
                          <div className={`text-base sm:text-lg font-bold mb-1 ${getScoreClass(score, par)}`}>
                            {score || '-'}
                          </div>
                          <div className="text-xs text-gray-400">{getScoreName(score, par)}</div>
                          {points !== 0 && (
                            <div className={`text-xs sm:text-sm font-semibold mt-1 ${points > 0 ? 'text-masters-yellow' : 'text-red-400'}`}>
                              {points > 0 ? `+${points}` : points} pts
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Back 9 */}
                <div className="overflow-x-auto">
                  <h3 className="text-masters-yellow font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Back Nine</h3>
                  <div className="grid grid-cols-9 gap-1 sm:gap-2 min-w-[600px]">
                    {[...Array(9)].map((_, i) => {
                      const score = selectedRound.roundData.scores[i + 9];
                      const par = augustaHolePars[i + 9];
                      const points = getScorePoints(score, par);
                      
                      return (
                        <div 
                          key={i + 9}
                          className="bg-masters-green/20 rounded-lg p-2 sm:p-3 text-center"
                        >
                          <div className="text-gray-400 text-xs sm:text-sm mb-1">Hole {i + 10}</div>
                          <div className="text-gray-300 text-xs mb-1 sm:mb-2">Par {par}</div>
                          <div className={`text-base sm:text-lg font-bold mb-1 ${getScoreClass(score, par)}`}>
                            {score || '-'}
                          </div>
                          <div className="text-xs text-gray-400">{getScoreName(score, par)}</div>
                          {points !== 0 && (
                            <div className={`text-xs sm:text-sm font-semibold mt-1 ${points > 0 ? 'text-masters-yellow' : 'text-red-400'}`}>
                              {points > 0 ? `+${points}` : points} pts
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Round Summary */}
                <div className="flex justify-between items-center mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-masters-yellow/20">
                  <div>
                    <div className="text-gray-400 text-sm">Round Total</div>
                    <div className="text-xl sm:text-2xl font-bold text-white">{selectedRound.roundData.total}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Points Earned</div>
                    <div className="text-xl sm:text-2xl font-bold text-masters-yellow">
                      {selectedRound.roundData.total}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsDisplay;
