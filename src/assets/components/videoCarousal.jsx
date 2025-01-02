import { hightlightsSlides } from "../constants";
import "../compStyles/videoCarousal.css";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";

function VideoCarousal() {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVid: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);

  const { isEnd, startPlay, videoId, isLastVid, isPlaying } = video;

  useGSAP(() => {
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prev) => ({
          ...prev,
          startPlay: true,
          isPlaying: true
        }));
      }
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, isPlaying, videoId, loadedData]);

  function handleLoadedMetaData(i, e) {
    setLoadedData((prev) => [...prev, e])
  }

  // useEffect(() => {
  //   const currentProgress = 0;

  //   let span = videoSpanRef.current;

  //   if (span[videoId]) {
  //     let animate = gsap.to(
  //       span[videoId],
  //       {
  //         onUpdate: () => {},
  //       },
  //       {
  //         onComplete: () => {},
  //       }
  //     );
  //   }
  // }, [videoId, startPlay]);

  function handleProcess(type, i) {
    switch (type) {
      case "video-end":
        setVideo((prev) => ({ ...prev, isEnd: true, videoId: i + 1 }));
        break;
      case "video-last":
        setVideo((prev) => ({ ...prev, isLastVid: true }));
        break;
      case "video-reset":
        setVideo((prev) => ({ ...prev, isLastVid: false, videoId: 0 }));
        break;
      case "play":
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
      default:
        return video;
    }
  }

  return (
    <>
      <div className="vc-main-c">
        {hightlightsSlides.map((slide, i) => (
          <div key={slide.id} id="slider">
            <div className="video-carousal_container">
              <div className="video-c">
                <video
                  id="video"
                  muted
                  playsInline={true}
                  preload="auto"
                  className="video-i"
                  key={slide.video}
                  ref={(elem) => (videoRef.current[i] = elem)}
                  onPlay={() => {
                    setVideo((prev) => ({
                      ...prev,
                      isPlaying: true,
                    }));
                  }}
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              </div>
              <div className="text-container">
                {slide.textLists.map((text) => (
                  <p key={text} className="slide-text">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="progress-bar-c">
        <div className="progres-container">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(elem) => (videoDivRef.current[i] = elem)}
              className="vid-span"
            >
              <span
                key={i}
                ref={(elem) => (videoSpanRef.current[i] = elem)}
                className="vid-span"
              ></span>
            </span>
          ))}
        </div>
        <button
          className="prg-act-btn"
        >
          <img
            src={isLastVid ? replayImg : !isPlaying ? playImg : pauseImg}
            alt="act-img"
            className="act-img"
            onClick={
              isLastVid
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
}
export default VideoCarousal;
