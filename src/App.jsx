import "../src/assets/compStyles/common.css";
import Hero from "./assets/components/hero";
import Highlights from "./assets/components/highlights";
import Navbar from "./assets/components/navbar";
function App() {
  return (
    <>
      <section className="main-section">
        <Navbar />
        <Hero />
        <Highlights/>
      </section>
    </>
  );
}

export default App;
