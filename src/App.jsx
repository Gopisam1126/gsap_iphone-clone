import "../src/assets/compStyles/common.css";
import Hero from "./assets/components/hero";
import Highlights from "./assets/components/highlights";
import Navbar from "./assets/components/navbar";
import Model from "./assets/components/model";
function App() {
  return (
    <>
      <section className="main-section">
        <Navbar />
        <Hero />
        <Highlights/>
        <Model/>
      </section>
    </>
  );
}

export default App;
