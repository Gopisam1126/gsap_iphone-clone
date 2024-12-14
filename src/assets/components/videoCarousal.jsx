import { hightlightsSlides } from "../constants";
import "../compStyles/videoCarousal.css";

function VideoCarousal() {
  return (
    <>
      <div className="vc-main-c">
        {hightlightsSlides.map((slide) => (
          <div key={slide.id} id="slider">
            <div className="video-carousal_container">
              <div className="video-c">
                <video id="video" muted playsInline={true} preload="auto" className="video-i" key={slide.video}>
                  <source src={slide.video} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default VideoCarousal;
