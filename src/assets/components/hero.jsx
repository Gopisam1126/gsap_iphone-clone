import { useGSAP } from "@gsap/react";
import "../compStyles/hero.css";
import gsap from "gsap";
import { heroVideo } from "../utils";

function Hero() {
  useGSAP(() => {
    gsap.to("#hero-head", {
      opacity: 1,
      delay: 2,
      duration: 2,
    });
    gsap.to('#cta', {
      opacity: 1,
      delay: 2,
      duration: 1,
      y: -5,
    })
  }, []);

  return (
    <>
      <section className="hero-main-sec">
        <div className="hero-m-head-c">
          <p id="hero-head" className="hero-main-head">
            Iphone 16 pro
          </p>
          <div className="video-container">
            <video
              key={heroVideo}
              autoPlay
              muted
              playsInline={true}
              className="video"
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
          </div>
        </div>
        <div id="cta">
          <div className="bl-c">
            <a href="#highlights" className="buy-link">Buy</a>
          </div>
          <p className="cta-b-desc">From $199/Month or $999</p>
        </div>
      </section>
    </>
  );
}

export default Hero;
