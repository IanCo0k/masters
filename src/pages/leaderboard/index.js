import Hero from "../components/Hero";
import Leaderboard from "../components/Leaderboard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function index() {
  return (
    <div>
      <Navbar />
      <Hero text="Leaderboard" />
      <div className="flex justify-center">
        <Leaderboard />
      </div>
      <Footer />
    </div>
  );
}
