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
  const [player2Data, setPlayer2Data] = useState({});
  const [modalOpenGolfer1, setModalOpenGolfer1] = useState(false);
  const [modalOpenGolfer2, setModalOpenGolfer2] = useState(false);

  const [loading, setLoading]  = useState(true);

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
    fetch("https://www.masters.com/en_US/scores/feeds/2024/scores.json")
      .then((response) => response.json())
      .then((data) => {
        const player = data.data.player.find(
          (player) => player["full_name"] === golferName
        );
        if (player) {
          setter(player);
        }
      });
  };

  useEffect(() => {
    findPlayerByFullName(golfer1Name, setPlayerData);
    findPlayerByFullName(golfer2Name, setPlayer2Data);
    setLoading(false)
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
  }, [playerData, player2Data]);

  const addScores = (player1, player2) => {
    return player1 + player2;
  };

  return (
    <div className="max-w-sm w-full mx-auto bg-masters-green border-2 border-masters-yellow shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-2">
        <h1 className="text-center text-gray-200 font-semibold text-2xl p-2">
          {teamName}
        </h1>
        <div className="mt-4">
          <div className="flex-col items-center justify-center">
            {playerData && player2Data && (
              <>
                <div className="flex mb-4 relative justify-center">
                  <img
                    className="w-24 h-24 object-cover hover:cursor-pointer border-2 border-masters-yellow rounded-full"
                    src={golfer1Image}
                    alt={`${golfer1Name}'s headshot`}
                    onClick={openModalGolfer1}
                  />
                  <dialog
                    id={`golfer1_modal_${index}`}
                    className="modal"
                    open={modalOpenGolfer1}
                    onClick={closeModalGolfer1}
                  >
                    <div
                      className="modal-box"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <form method="dialog">
                        <button
                          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                          onClick={closeModalGolfer1}
                        >
                          ✕
                        </button>
                      </form>
                      <div className="flex-col justify-center items-center align-center">
                        <div className="w-full flex justify-center">
                          <img
                            className="w-48 h-48 object-cover border-2 bg-masters-green border-masters-yellow rounded-full"
                            src={golfer1Image}
                            alt={`${golfer1Name}'s headshot`}
                          />
                        </div>
                        <h1 className="text-center text-gray-200 font-semibold text-2xl p-2">
                          {golfer1Name}
                        </h1>
                        <div className="text-center text-gray-200 font-semibold text-2xl p-2">
                          {playerData.today}, {playerData.pos}
                        </div>
                        <div className="text-center p-3 text-2xl">Round 1</div>
                        {playerData.round1?.scores && (
                          <div className="grid grid-cols-9 text-xl grid-rows-4 gap-4">
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[0]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[1]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[2]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[3]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[4]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[5]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[6]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[7]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[8]}
                          </div>

                          <div>{playerData.round1.scores[0]}</div>
                          <div>{playerData.round1.scores[1]}</div>
                          <div>{playerData.round1.scores[2]}</div>
                          <div>{playerData.round1.scores[3]}</div>
                          <div>{playerData.round1.scores[4]}</div>
                          <div>{playerData.round1.scores[5]}</div>
                          <div>{playerData.round1.scores[6]}</div>
                          <div>{playerData.round1.scores[7]}</div>
                          <div>{playerData.round1.scores[8]}</div>

                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[9]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[10]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[11]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[12]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[13]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[14]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[15]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[16]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[17]}
                          </div>

                          <div>{playerData.round1.scores[9]}</div>
                          <div>{playerData.round1.scores[10]}</div>
                          <div>{playerData.round1.scores[11]}</div>
                          <div>{playerData.round1.scores[12]}</div>
                          <div>{playerData.round1.scores[13]}</div>
                          <div>{playerData.round1.scores[14]}</div>
                          <div>{playerData.round1.scores[15]}</div>
                          <div>{playerData.round1.scores[16]}</div>
                          <div>{playerData.round1.scores[17]}</div>
                        </div>
                        
                        )}
                        
                      </div>
                    </div>
                  </dialog>
                </div>
                <div className="flex mb-4 relative justify-center">
                  <img
                    className="w-24 h-24 hover:cursor-pointer object-cover border-2 border-masters-yellow rounded-full"
                    src={golfer2Image}
                    alt={`${golfer2Name}'s headshot`}
                    onClick={openModalGolfer2}
                  />
                  <dialog
                    id={`golfer2_modal_${index}`}
                    className="modal"
                    open={modalOpenGolfer2}
                    onClick={closeModalGolfer2}
                  >
                    <div
                      className="modal-box"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <form method="dialog">
                        <button
                          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                          onClick={closeModalGolfer2}
                        >
                          ✕
                        </button>
                      </form>
                      <div className="flex-col justify-center items-center align-center">
                        <div className="w-full flex justify-center">
                          <img
                            className="w-48 h-48 object-cover border-2 bg-masters-green border-masters-yellow rounded-full"
                            src={golfer2Image}
                            alt={`${golfer2Name}'s headshot`}
                          />
                        </div>
                        <h1 className="text-center text-gray-200 font-semibold text-2xl p-2">
                          {golfer2Name}
                        </h1>
                        <div className="text-center text-gray-200 font-semibold text-2xl p-2">
                          {player2Data.today}, {player2Data.pos}
                        </div>
                        <div className="text-center p-3 text-2xl">Round 1</div>
                        {player2Data.round1?.scores && (
                          <div className="grid grid-cols-9 text-xl grid-rows-4 gap-4">
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[0]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[1]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[2]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[3]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[4]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[5]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[6]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[7]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[8]}
                          </div>

                          <div>{player2Data.round1.scores[0]}</div>
                          <div>{player2Data.round1.scores[1]}</div>
                          <div>{player2Data.round1.scores[2]}</div>
                          <div>{player2Data.round1.scores[3]}</div>
                          <div>{player2Data.round1.scores[4]}</div>
                          <div>{player2Data.round1.scores[5]}</div>
                          <div>{player2Data.round1.scores[6]}</div>
                          <div>{player2Data.round1.scores[7]}</div>
                          <div>{player2Data.round1.scores[8]}</div>

                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[9]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[10]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[11]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[12]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[13]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[14]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[15]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[16]}
                          </div>
                          <div className="text-masters-yellow font-bold">
                            {augustaHolePars[17]}
                          </div>

                          <div>{player2Data.round1.scores[9]}</div>
                          <div>{player2Data.round1.scores[10]}</div>
                          <div>{player2Data.round1.scores[11]}</div>
                          <div>{player2Data.round1.scores[12]}</div>
                          <div>{player2Data.round1.scores[13]}</div>
                          <div>{player2Data.round1.scores[14]}</div>
                          <div>{player2Data.round1.scores[15]}</div>
                          <div>{player2Data.round1.scores[16]}</div>
                          <div>{player2Data.round1.scores[17]}</div>
                        </div>
                        
                        )}
                        </div>
                    </div>
                  </dialog>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="mt-4 border-t border-gray-200 pt-2 text-center">
          <p className="text-white text-7xl">
            {addScores(player1RoundScores, player2RoundScores)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
