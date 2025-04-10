import { useState, useEffect } from 'react';


// https://images.masters.com/players/2024/240x240/47959.jpg example image url

export default function Leaderboard() {

    const [playerData, setPlayerData] = useState([]);

    useEffect(() => {
        fetch("https://www.masters.com/en_US/scores/feeds/2025/scores.json")
        .then(response => response.json())
        .then(data => {{
            console.log(data.data.player)
            setPlayerData(data.data.player)
        }})
    }
    , []);

  return (
    <div className='p-2 w-full text-gray-200 max-w-lg'>
      <div className='grid grid-cols-1  gap-4'>
        {playerData.map((player, index) => (
          <div key={index} className='bg-masters-green border-2 border-masters-yellow flex  items-center p-4 rounded-lg shadow-md'>
            <div className='flex-start mr-8'>
                <img src={`https://images.masters.com/players/2025/240x240/${player.id}.jpg`} alt={player.player_name} className='w-12 h-12 mx-auto rounded-full' />
            </div>    
            <h2 className='text-center text-xl font-bold mr-3'>{player.pos}. {player.full_name}</h2>
            <div className='flex-end'>
            <p className='text-center text-lg font-bold text-masters-yellow'>{player.topar}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
