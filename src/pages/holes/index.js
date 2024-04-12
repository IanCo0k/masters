import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Holes from "../components/Holes"
import Hero from "../components/Hero"
export default function index() {
  return (
    <div>
      <Navbar />
      <Hero text="Select Holes" />
      <Holes />
      <Footer />
    </div>
  )
}
