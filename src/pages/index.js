import Hero from './components/Hero';
import TeamsDisplay from './components/TeamsDisplay';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
export default function Index() {
  return (
    <div>
      <Navbar />
      <Hero text="Peen Masters Fantasy" />
      <TeamsDisplay />
      <Footer />
    </div>
  );
}
