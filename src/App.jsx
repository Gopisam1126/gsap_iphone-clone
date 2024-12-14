import "../src/assets/compStyles/common.css";
import Hero from "./assets/components/hero";
import Navbar from "./assets/components/navbar";
function App() {
  return (
    <>
      <section className="main-section">
        <Navbar />
        <Hero />
      </section>
    </>
  );
}

export default App;
