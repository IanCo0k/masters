import { useState, useEffect } from "react";
import Image from "next/image";

export default function Holes() {
  const [holes, setHoles] = useState([]);
  const [selectedHole, setSelectedHole] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // Set loading state to true when fetching data
    fetch("https://www.masters.com/en_US/json/man/course/angc/holes.json")
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          console.log(data.holes[selectedHole - 1]);
          setHoles(data.holes[selectedHole - 1]);
          setLoading(false); // Set loading state to false after data is fetched
        }, 1500); // 1.5-second delay
      });
  }, [selectedHole]);

  const handleSelectChange = (e) => {
    setSelectedHole(parseInt(e.target.value));
  };

  return (
    <div className="flex w-full justify-center">
      <div className="max-w-[800px]">
        <div className="w-full flex justify-center p-3">
          
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={handleSelectChange}
          >
            <option disabled>Select Hole</option>
            {Array.from({ length: 18 }, (_, index) => (
              <option key={index + 1} value={index + 1}>{index + 1}</option>
            ))}
          </select>
        </div>
        {loading ? ( // Check if data is loading
          <div className="h-screen">Loading data...</div>
        ) : (
          holes && (
            <>
                                <h2 className="text-4xl  p-3 mt-5 text-center font-bold">{holes.number}. {holes.plant}</h2>

              <div className="grid p-2 text-gray-200 grid-cols-3 gap-4">
                <div className="bg-masters-green border-2 border-masters-yellow text-center p-2 rounded-lg shadow-md">
                  <p>Hole</p>
                  <p className="text-2xl font-bold">{holes.number}</p>
                </div>

                <div className="bg-masters-green border-2 border-masters-yellow text-center p-2 rounded-lg shadow-md">
                  <p>Par</p>
                  <p className="text-2xl font-bold">{holes.par}</p>
                </div>

                <div className="bg-masters-green border-2 border-masters-yellow text-center p-2 rounded-lg shadow-md">
                  <p>Yards</p>
                  <p className="text-2xl font-bold">{holes.yds}</p>
                </div>
              </div>

              <div className="grid p-2 text-gray-200 text-sm grid-cols-6 gap-1">
                <div className="bg-masters-green border-2 border-masters-yellow text-center p-1 rounded-lg shadow-md">
                  <p>Eagles</p>
                  <p className="text-xl font-bold">{holes.eagles}</p>
                </div>

                <div className="bg-masters-green border-2 border-masters-yellow text-center p-1 rounded-lg shadow-md">
                  <p>Birdies</p>
                  <p className="text-xl font-bold">{holes.birdies}</p>
                </div>

                <div className="bg-masters-green border-2 border-masters-yellow text-center p-1 rounded-lg shadow-md">
                  <p>Pars</p>
                  <p className="text-xl font-bold">{holes.pars}</p>
                </div>

                <div className="bg-masters-green border-2 border-masters-yellow text-center p-1 rounded-lg shadow-md">
                  <p>Bogies</p>
                  <p className="text-xl font-bold">{holes.bogies}</p>
                </div>

                <div className="bg-masters-green border-2 border-masters-yellow text-center p-1 rounded-lg shadow-md">
                  <p>Dbl</p>
                  <p className="text-xl font-bold">{holes.dblBogies}</p>
                </div>

                <div className="bg-masters-green border-2 border-masters-yellow text-center p-1 rounded-lg shadow-md">
                  <p>Trp+</p>
                  <p className="text-xl font-bold">{holes.other}</p>
                </div>
              </div>

              <Image
                src={`https://masters.com${holes.imageH.src}`}
                alt={holes.imageH.src}
                width={800}
                height={400}
              />
              <div className="p-3">
                <h2 className='text-xl font-bold'>Description</h2>
                <p>{holes.holeDesc}</p>
                <br />
                <h2 className="text-xl font-bold">History</h2>
                <p>{holes.hist}</p>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}
