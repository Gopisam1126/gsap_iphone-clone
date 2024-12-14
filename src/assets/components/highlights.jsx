import { useGSAP } from "@gsap/react";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import "../compStyles/highlights.css";
import gsap from "gsap";
import VideoCarousal from "./videoCarousal";

function Highlights() {
  useGSAP(() => {
    gsap.to("#main-head", {
      opacity: 1,
      y: 0,
      delay: 2,
      duration: 1,
    });

    gsap.to("#watch-title", {
      opacity: 1,
      y: 0,
      delay: 2,
      duration: 1,
    });
  }, []);

  return (
    <>
      <section className="hl-main-sec">
        <div className="hl-main-c">
          <div className="hl-head">
            <h1 id="main-head" className="hl-i1">
              Get the Highlights
            </h1>

            <div className="watch-filim-c">
              <a href="#" id="watch-title" className="watch-filim-link hl-i1">
                watch film
                <PlayCircleOutlineRoundedIcon
                  style={{
                    marginLeft: "0.3rem",
                  }}
                />
              </a>
            </div>
          </div>
          <VideoCarousal/>
        </div>
      </section>
    </>
  );
}

export default Highlights;
