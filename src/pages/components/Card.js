import { useState, useEffect } from "react";

const Card = ({
  teamName,
  managerName,
  managerImage,
  golfer1Name,
  golfer1Image,
  golfer2Name,
  golfer2Image,
  totalScore,
  index,
}) => {
  const [playerData, setPlayerData] = useState({});
  const [player1RoundScores, setPlayer1RoundScores] = useState([]);
  const [player2RoundScores, setPlayer2RoundScores] = useState([]);
  const [player1Round2Scores, setPlayer1Round2Scores] = useState([]);
  const [player2Round2Scores, setPlayer2Round2Scores] = useState([]);
  const [player1Round3Scores, setPlayer1Round3Scores] = useState([]);
  const [player2Round3Scores, setPlayer2Round3Scores] = useState([]);
  const [player1Round4Scores, setPlayer1Round4Scores] = useState([]);
  const [player2Round4Scores, setPlayer2Round4Scores] = useState([]);
  const [player2Data, setPlayer2Data] = useState({});
  const [modalOpenGolfer1, setModalOpenGolfer1] = useState(false);
  const [modalOpenGolfer2, setModalOpenGolfer2] = useState(false);

  const [p1r1Summary, setP1r1Summary] = useState([]);
  const [p1r2Summary, setP1r2Summary] = useState([]);
  const [p2r1Summary, setP2r1Summary] = useState([]);
  const [p2r2Summary, setP2r2Summary] = useState([]);

  const [currentRoundTabGolfer1, setCurrentRoundTabGolfer1] = useState(4);
  const [currentRoundTabGolfer2, setCurrentRoundTabGolfer2] = useState(4);

  const handleTabChangeGolfer1 = (round) => {
    setCurrentRoundTabGolfer1(round);
  };

  const handleTabChangeGolfer2 = (round) => {
    setCurrentRoundTabGolfer2(round);
  };

  const [loading, setLoading] = useState(true);

  let augustaHolePars = [4, 5, 4, 3, 4, 3, 4, 5, 4, 4, 4, 3, 5, 4, 5, 3, 4, 4];

  const openModalGolfer1 = () => {
    setModalOpenGolfer1(true);
  };

  const closeModalGolfer1 = () => {
    setModalOpenGolfer1(false);
  };

  const openModalGolfer2 = () => {
    setModalOpenGolfer2(true);
  };

  const closeModalGolfer2 = () => {
    setModalOpenGolfer2(false);
  };

  const findPlayerByFullName = (golferName, setter) => {
    fetch("https://www.masters.com/en_US/scores/feeds/2025/scores.json")
      .then((response) => response.json())
      .then((data) => {
        const player = data.data.player.find(
          (player) => player["full_name"] === golferName
        );
        if (player) {
          setter(player);
          console.log(player);
        }
      });
  };

  useEffect(() => {
    findPlayerByFullName(golfer1Name, setPlayerData);
    findPlayerByFullName(golfer2Name, setPlayer2Data);
    setLoading(false);
  }, [golfer1Name, golfer2Name]);

  /**
   * Scoring Rules:
   *
   * Standard Scoring:
   * - Hole in one: 20 points
   * - Eagle: 5 points
   * - Birdie: 2 points
   * - Par: 1 point
   * - Bogey: -1 point
   * - Double bogey: -3 points
   * - Triple bogey or worse: -5 points
   *
   * Additional Scoring (from the image):
   * - Make Cut: 15 points
   * - Total day under par: 5 points
   * - Total day over par: -5 points
   * - Lowest round of day (entire field): 10 points
   * - Top 10 Finish (final): 15 points
   * - Top 5 Finish (final): 25 points
   * - Win the Masters: 50 points
   *
   */

  useEffect(() => {
    if (playerData && playerData.round1 && playerData.round1.scores) {
      let score = 0;
      let round1Scores = playerData.round1.scores;

      for (let i = 0; i < round1Scores.length; i++) {
        let holeScore = round1Scores[i];
        let holePar = augustaHolePars[i];

        if (holeScore !== null) {
          if (holeScore === 1) {
            p1r1Summary.push("Hole in one! 20 points");
            score += 20;
          } else if (holeScore === holePar - 2) {
            p1r1Summary.push("Eagle! 5 points");
            score += 5;
          } else if (holeScore === holePar - 1) {
            p1r1Summary.push("Birdie! 2 points");
            score += 2;
          } else if (holeScore === holePar) {
            p1r1Summary.push("Par! 1 point");
            score += 1;
          } else if (holeScore === holePar + 1) {
            p1r1Summary.push("Bogey! -1 point");
            score -= 1;
          } else if (holeScore === holePar + 2) {
            p1r1Summary.push("Double bogey! -3 points");
            score -= 3;
          } else if (holeScore >= holePar + 3) {
            p1r1Summary.push("Triple bogey or worse! -5 points");
            score -= 5;
          }
        }
      }

      setPlayer1RoundScores(score);
    }

    if (player2Data && player2Data.round1 && player2Data.round1.scores) {
      let score = 0;
      let round1Scores = player2Data.round1.scores;

      for (let i = 0; i < round1Scores.length; i++) {
        let holeScore = round1Scores[i];
        let holePar = augustaHolePars[i];

        if (holeScore !== null) {
          if (holeScore === 1) {
            score += 20;
          } else if (holeScore === holePar - 2) {
            score += 5;
          } else if (holeScore === holePar - 1) {
            score += 2;
          } else if (holeScore === holePar) {
            score += 1;
          } else if (holeScore === holePar + 1) {
            score -= 1;
          } else if (holeScore === holePar + 2) {
            score -= 3;
          } else if (holeScore >= holePar + 3) {
            score -= 5;
          }
        }
      }
      setPlayer2RoundScores(score);
    }

    if (playerData && playerData.round2 && playerData.round2.scores) {
      let score = 0;
      let round2Scores = playerData.round2.scores;

      for (let i = 0; i < round2Scores.length; i++) {
        let holeScore = round2Scores[i];
        let holePar = augustaHolePars[i];

        if (holeScore !== null) {
          if (holeScore === 1) {
            score += 20;
          } else if (holeScore === holePar - 2) {
            score += 5;
          } else if (holeScore === holePar - 1) {
            score += 2;
          } else if (holeScore === holePar) {
            score += 1;
          } else if (holeScore === holePar + 1) {
            score -= 1;
          } else if (holeScore === holePar + 2) {
            score -= 3;
          } else if (holeScore >= holePar + 3) {
            score -= 5;
          }
        }
      }

      setPlayer1Round2Scores(score);
    }

    if (player2Data && player2Data.round2 && player2Data.round2.scores) {
      let score = 0;
      let round2Scores = player2Data.round2.scores;

      for (let i = 0; i < round2Scores.length; i++) {
        let holeScore = round2Scores[i];
        let holePar = augustaHolePars[i];

        if (holeScore !== null) {
          if (holeScore === 1) {
            score += 20;
          } else if (holeScore === holePar - 2) {
            score += 5;
          } else if (holeScore === holePar - 1) {
            score += 2;
          } else if (holeScore === holePar) {
            score += 1;
          } else if (holeScore === holePar + 1) {
            score -= 1;
          } else if (holeScore === holePar + 2) {
            score -= 3;
          } else if (holeScore >= holePar + 3) {
            score -= 5;
          }
        }
      }

      setPlayer2Round2Scores(score);
    }

    if (playerData && playerData.round3 && playerData.round3.scores) {
      let score = 0;
      let round3Scores = playerData.round3.scores;

      for (let i = 0; i < round3Scores.length; i++) {
        let holeScore = round3Scores[i];
        let holePar = augustaHolePars[i];

        if (holeScore !== null) {
          if (holeScore === 1) {
            score += 20;
          } else if (holeScore === holePar - 2) {
            score += 5;
          } else if (holeScore === holePar - 1) {
            score += 2;
          } else if (holeScore === holePar) {
            score += 1;
          } else if (holeScore === holePar + 1) {
            score -= 1;
          } else if (holeScore === holePar + 2) {
            score -= 3;
          } else if (holeScore >= holePar + 3) {
            score -= 5;
          }
        }
      }

      setPlayer1Round3Scores(score);
    }

    if (player2Data && player2Data.round3 && player2Data.round3.scores) {
      let score = 0;
      let round3Scores = player2Data.round3.scores;

      for (let i = 0; i < round3Scores.length; i++) {
        let holeScore = round3Scores[i];
        let holePar = augustaHolePars[i];

        if (holeScore !== null) {
          if (holeScore === 1) {
            score += 20;
          } else if (holeScore === holePar - 2) {
            score += 5;
          } else if (holeScore === holePar - 1) {
            score += 2;
          } else if (holeScore === holePar) {
            score += 1;
          } else if (holeScore === holePar + 1) {
            score -= 1;
          } else if (holeScore === holePar + 2) {
            score -= 3;
          } else if (holeScore >= holePar + 3) {
            score -= 5;
          }
        }
      }

      setPlayer2Round3Scores(score);
    }

    if (playerData && playerData.round4 && playerData.round4.scores) {
      let score = 0;
      let round4Scores = playerData.round4.scores;

      for (let i = 0; i < round4Scores.length; i++) {
        let holeScore = round4Scores[i];
        let holePar = augustaHolePars[i];

        if (holeScore !== null) {
          if (holeScore === 1) {
            score += 20;
          } else if (holeScore === holePar - 2) {
            score += 5;
          } else if (holeScore === holePar - 1) {
            score += 2;
          } else if (holeScore === holePar) {
            score += 1;
          } else if (holeScore === holePar + 1) {
            score -= 1;
          } else if (holeScore === holePar + 2) {
            score -= 3;
          } else if (holeScore >= holePar + 3) {
            score -= 5;
          }
        }
      }

      setPlayer1Round4Scores(score);
    }

    if (player2Data && player2Data.round4 && player2Data.round4.scores) {
      let score = 0;
      let round4Scores = player2Data.round4.scores;

      for (let i = 0; i < round4Scores.length; i++) {
        let holeScore = round4Scores[i];
        let holePar = augustaHolePars[i];

        if (holeScore !== null) {
          if (holeScore === 1) {
            score += 20;
          } else if (holeScore === holePar - 2) {
            score += 5;
          } else if (holeScore === holePar - 1) {
            score += 2;
          } else if (holeScore === holePar) {
            score += 1;
          } else if (holeScore === holePar + 1) {
            score -= 1;
          } else if (holeScore === holePar + 2) {
            score -= 3;
          } else if (holeScore >= holePar + 3) {
            score -= 5;
          }
        }
      }

      setPlayer2Round4Scores(score);
    }


  }, [playerData, player2Data]);

  const addScores = (player1, player2) => {
    return player1 + player2;
  };

  const getTotalScore = () => {
    return (
      addScores(player1RoundScores, player2RoundScores) +
      addScores(player1Round2Scores, player2Round2Scores) +
      addScores(player1Round3Scores, player2Round3Scores) +
      addScores(player1Round4Scores, player2Round4Scores)
    );
  };

  const renderScoreGrid = (roundData, pars) => {
    if (!roundData?.scores) return null;
    
    return (
      <div className="grid grid-cols-9 gap-2 text-sm md:text-base">
        {/* Front 9 */}
        <div className="col-span-9 bg-masters-yellow/10 rounded-lg p-2">
          <div className="grid grid-cols-9 gap-2">
            {pars.slice(0, 9).map((par, idx) => (
              <div key={`par-front-${idx}`} className="text-masters-yellow text-center font-semibold">
                {par}
              </div>
            ))}
            {roundData.scores.slice(0, 9).map((score, idx) => (
              <div 
                key={`score-front-${idx}`} 
                className={`text-center font-bold ${
                  score < pars[idx] ? 'text-red-400' : 
                  score > pars[idx] ? 'text-blue-400' : 
                  'text-white'
                }`}
              >
                {score}
              </div>
            ))}
          </div>
        </div>

        {/* Back 9 */}
        <div className="col-span-9 bg-masters-yellow/10 rounded-lg p-2 mt-2">
          <div className="grid grid-cols-9 gap-2">
            {pars.slice(9).map((par, idx) => (
              <div key={`par-back-${idx}`} className="text-masters-yellow text-center font-semibold">
                {par}
              </div>
            ))}
            {roundData.scores.slice(9).map((score, idx) => (
              <div 
                key={`score-back-${idx}`} 
                className={`text-center font-bold ${
                  score < pars[idx + 9] ? 'text-red-400' : 
                  score > pars[idx + 9] ? 'text-blue-400' : 
                  'text-white'
                }`}
              >
                {score}
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="col-span-9 text-center mt-4">
          <span className="text-2xl font-bold text-masters-yellow">
            Total: {roundData.total}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-gradient-to-br from-masters-green to-masters-green/80 rounded-xl shadow-xl overflow-hidden border border-masters-yellow/30 backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02]">
      {/* Team Header */}
      <div className="px-6 py-4 bg-masters-yellow/10 border-b border-masters-yellow/30">
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          {teamName}
        </h2>
        <div className="text-center">
          <span className="text-6xl font-bold text-masters-yellow">
            {getTotalScore()}
          </span>
          <span className="text-white/60 ml-2 text-xl">pts</span>
        </div>
      </div>

      {/* Golfers Section */}
      <div className="p-6 space-y-4">
        {/* Golfer 1 */}
        <div 
          className="group flex items-center gap-4 p-3 rounded-lg transition-all cursor-pointer
                     hover:bg-white/5 border border-transparent hover:border-masters-yellow/20"
          onClick={openModalGolfer1}
        >
          <div className="w-16 h-16 flex-shrink-0 relative rounded-full border-2 border-masters-yellow overflow-hidden
                          group-hover:border-masters-yellow/50 transition-all">
            <img
              src={golfer1Image}
              alt={golfer1Name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-white font-semibold text-lg truncate group-hover:text-masters-yellow transition-colors">
              {golfer1Name}
            </h3>
            {playerData.pos && (
              <p className="text-masters-yellow/80 text-sm">
                Position: {playerData.pos} ({playerData.topar})
              </p>
            )}
          </div>
        </div>

        {/* Golfer 2 */}
        <div 
          className="group flex items-center gap-4 p-3 rounded-lg transition-all cursor-pointer
                     hover:bg-white/5 border border-transparent hover:border-masters-yellow/20"
          onClick={openModalGolfer2}
        >
          <div className="w-16 h-16 flex-shrink-0 relative rounded-full border-2 border-masters-yellow overflow-hidden
                          group-hover:border-masters-yellow/50 transition-all">
            <img
              src={golfer2Image}
              alt={golfer2Name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-white font-semibold text-lg truncate group-hover:text-masters-yellow transition-colors">
              {golfer2Name}
            </h3>
            {player2Data.pos && (
              <p className="text-masters-yellow/80 text-sm">
                Position: {player2Data.pos} ({player2Data.topar})
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <dialog
        className="modal backdrop-blur-sm"
        open={modalOpenGolfer1}
        onClick={closeModalGolfer1}
      >
        <div 
          className="modal-box bg-[#0a0f1c]/95 border-2 border-masters-yellow max-w-3xl backdrop-blur-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 flex-shrink-0 relative rounded-full border-2 border-masters-yellow overflow-hidden">
                <img
                  src={golfer1Image}
                  alt={golfer1Name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{golfer1Name}</h2>
                {playerData.pos && (
                  <p className="text-masters-yellow">
                    Position: {playerData.pos} ({playerData.topar})
                  </p>
                )}
              </div>
            </div>
            <button
              className="btn btn-circle btn-ghost text-white hover:bg-masters-yellow/20 transition-colors"
              onClick={closeModalGolfer1}
            >
              ✕
            </button>
          </div>

          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4].map((round) => (
              <button
                key={`g1-round-${round}`}
                className={`px-6 py-2 rounded-full text-white border border-masters-yellow/30 
                          hover:bg-masters-yellow/20 transition-all ${
                  currentRoundTabGolfer1 === round ? 'bg-masters-yellow/30 font-semibold' : ''
                }`}
                onClick={() => handleTabChangeGolfer1(round)}
              >
                Round {round}
              </button>
            ))}
          </div>

          {playerData[`round${currentRoundTabGolfer1}`] && 
            renderScoreGrid(playerData[`round${currentRoundTabGolfer1}`], augustaHolePars)
          }
        </div>
      </dialog>

      <dialog
        className="modal backdrop-blur-sm"
        open={modalOpenGolfer2}
        onClick={closeModalGolfer2}
      >
        <div 
          className="modal-box bg-[#0a0f1c]/95 border-2 border-masters-yellow max-w-3xl backdrop-blur-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 flex-shrink-0 relative rounded-full border-2 border-masters-yellow overflow-hidden">
                <img
                  src={golfer2Image}
                  alt={golfer2Name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{golfer2Name}</h2>
                {player2Data.pos && (
                  <p className="text-masters-yellow">
                    Position: {player2Data.pos} ({player2Data.topar})
                  </p>
                )}
              </div>
            </div>
            <button
              className="btn btn-circle btn-ghost text-white hover:bg-masters-yellow/20 transition-colors"
              onClick={closeModalGolfer2}
            >
              ✕
            </button>
          </div>

          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4].map((round) => (
              <button
                key={`g2-round-${round}`}
                className={`px-6 py-2 rounded-full text-white border border-masters-yellow/30 
                          hover:bg-masters-yellow/20 transition-all ${
                  currentRoundTabGolfer2 === round ? 'bg-masters-yellow/30 font-semibold' : ''
                }`}
                onClick={() => handleTabChangeGolfer2(round)}
              >
                Round {round}
              </button>
            ))}
          </div>

          {player2Data[`round${currentRoundTabGolfer2}`] && 
            renderScoreGrid(player2Data[`round${currentRoundTabGolfer2}`], augustaHolePars)
          }
        </div>
      </dialog>
    </div>
  );
};

export default Card;
