import Card from './Card'; // assuming the file is in the same directory

const teamsData = [
  {
    teamName: "Ian Cook",
    managerName: "Ian Cook",
    managerImage: "https://media.licdn.com/dms/image/D5603AQGoG0oPOOzUNQ/profile-displayphoto-shrink_800_800/0/1673552040979?e=2147483647&v=beta&t=r9oXKngbGbRsZbVYAOigVQ1wsjgohGZ0k6QZzpDiP9Y",
    golfer1Name: "Hideki Matsuyama",
    golfer1Image: "https://a.espncdn.com/combiner/i?img=/i/headshots/golf/players/full/5860.png&w=350&h=254",
    golfer2Name: "Collin Morikawa",
    golfer2Image: "https://a.espncdn.com/combiner/i?img=/i/headshots/golf/players/full/10592.png&w=350&h=254",
    totalScore: 20,
    index: 0,
    key: 0
  },
  {
    teamName: "Evan Hovingh",
    managerName: "Evan Hovingh",
    managerImage: "https://media.licdn.com/dms/image/C4D03AQGh2J5Tu4-m1w/profile-displayphoto-shrink_200_200/0/1646429215805?e=2147483647&v=beta&t=rExfDoERfs7kmEG-3V5B-XlDlhmwnTvKivvNDm5XNkY",
    golfer1Name: "Xander Schauffele",
    golfer1Image: "https://a.espncdn.com/combiner/i?img=/i/headshots/golf/players/full/10140.png&w=350&h=254",
    golfer2Name: "Tommy Fleetwood",
    golfer2Image: "https://b.fssta.com/uploads/application/golf/headshots/3672.vresize.350.350.medium.76.png",
    totalScore: 20,
    index: 1,
    key: 1
  },
  {
    teamName: "Matt Gillette",
    managerName: "Matt Gillette",
    managerImage: "https://media.licdn.com/dms/image/D5603AQHMzFoPhQRRYw/profile-displayphoto-shrink_400_400/0/1701874114573?e=2147483647&v=beta&t=jFCmXMujj3QNF_XTBwsdOdzOXnGgyHBeCGN6m8CCsFk",
    golfer1Name: "Viktor Hovland",
    golfer1Image: "https://b.fssta.com/uploads/application/golf/headshots/11612.vresize.350.350.medium.9.png",
    golfer2Name: "Rory McIlroy",
    golfer2Image: "https://b.fssta.com/uploads/application/golf/headshots/380.vresize.350.350.medium.79.png",
    totalScore: 40,
    index: 2,
    key: 2
  },
  {
    teamName: "Nick Martin",
    managerName: "Nick Martin",
    managerImage: "https://media.licdn.com/dms/image/C5603AQF69_iPKLuVGg/profile-displayphoto-shrink_200_200/0/1613173187960?e=2147483647&v=beta&t=OVBpp0yyWNeHDFNHvD7JjC2oYiaL9bwodbYeA14yqvU",
    golfer1Name: "Scottie Scheffler",
    golfer1Image: "https://a.espncdn.com/combiner/i?img=/i/headshots/golf/players/full/9478.png&w=350&h=254",
    golfer2Name: "Min Woo Lee",
    golfer2Image: "https://a.espncdn.com/combiner/i?img=/i/headshots/golf/players/full/4410932.png&w=350&h=254",
    totalScore: -10,
    index: 3,
    key: 3
  },
  {
    teamName: "Chet Huls",
    managerName: "Chet Huls",
    managerImage: "https://media.licdn.com/dms/image/D5603AQEQS4Xsf5hR8Q/profile-displayphoto-shrink_800_800/0/1670181699494?e=2147483647&v=beta&t=k9HcSWkscsLfzp0U2uCR9HODa_hPZtFLhYu8yvKELzQ",
    golfer1Name: "Bryson DeChambeau",
    golfer1Image: "https://a.espncdn.com/combiner/i?img=/i/headshots/golf/players/full/10046.png&w=350&h=254",
    golfer2Name: "Ludvig Åberg",
    golfer2Image: "https://a.espncdn.com/combiner/i?img=/i/headshots/golf/players/full/4375972.png&w=350&h=254",
    totalScore: 35,
    index: 4,
    key: 4
  }
];

const TeamsDisplay = () => {

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {teamsData.map((team, index) => (
        <Card 
          key={index}
          index={index}
          teamName={team.teamName}
          managerName={team.managerName}
          managerImage={team.managerImage}
          golfer1Name={team.golfer1Name}
          golfer1Image={team.golfer1Image}
          golfer2Name={team.golfer2Name}
          golfer2Image={team.golfer2Image}
          totalScore={team.totalScore}
        />
      ))}
    </div>
  );
};

export default TeamsDisplay;
