import Hero from "./components/Hero";
import TeamsDisplay from "./components/TeamsDisplay";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default function Index() {
  return (
    <div>
      <Navbar />
      <Hero text="Peen Masters Fantasy" />
      <div className="flex w-full p-2 justify-center">
        {/* The button to open modal */}
        <label htmlFor="my_modal_7" className="btn">
          Legend
        </label>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my_modal_7" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">

            <div className="modal-header">
              <h2 className="text-2xl font-bold">Legend</h2>
            </div>

              <div className="modal-body">
                <ul>
                  <li>Hole in one: <span className="font-bold text-masters-yellow">20</span> points</li>
                  <li>Eagle: <span className="font-bold text-masters-yellow">5</span> points</li>
                  <li>Birdie: <span className="font-bold text-masters-yellow">2</span> points</li>
                  <li>Par: <span className="font-bold text-masters-yellow">1</span> point</li>
                  <li>Bogey: <span className="font-bold text-red-400">-1</span> point</li>
                  <li>Double bogey: <span className="font-bold text-red-400">-3</span> points</li>
                  <li>Triple bogey or worse: <span className="font-bold text-red-400">-5</span> points</li>
                </ul>
                <br />
                <ul>
                  <li>Make Cut: <span className="font-bold text-masters-yellow">15</span> points</li>
                  <li>Total day under par: <span className="font-bold text-masters-yellow">5</span> points</li>
                  <li>Total day over par: <span className="font-bold text-red-400">-5</span> points</li>
                  <li>Lowest round of day (entire field): <span className="font-bold text-masters-yellow">10</span> points</li>
                  <li>Top 10 Finish (final): <span className="font-bold text-masters-yellow">15</span> points</li>
                  <li>Top 5 Finish (final): <span className="font-bold text-masters-yellow">25</span> points</li>
                  <li>Win the Masters: <span className="font-bold text-masters-yellow">50</span> points</li>
                </ul>
              </div>

    

          </div>
          <label className="modal-backdrop" htmlFor="my_modal_7">
            Close
          </label>
        </div>
      </div>
      <TeamsDisplay />
      <Footer />
    </div>
  );
}
