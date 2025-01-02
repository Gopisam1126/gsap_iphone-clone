/* eslint-disable react-hooks/exhaustive-deps */
import { hightlightsSlides } from "../constants";
import "../compStyles/videoCarousal.css";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function VideoCarousal() {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1200
                  ? "10vw"
                  : "4vw",
            });

            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "#fff",
            });
          }
        },

        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId == 0) {
        anim.restart();
      }

      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;

      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      default:
        return video;
    }
  };

  const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);

  return (
    <>
      <div className="vc-main-c">
        {hightlightsSlides.map((slide, i) => (
          <div key={slide.id} id="slider">
            <div className={`video-carousal_container ${
                  slide.id === 2 && "translate-x-44"
                } pointer-events-none`}>
              <div
                className={`video-c `}
              >
                <video
                  id="video"
                  muted
                  playsInline={true}
                  preload="auto"
                  className={`video-i`}
                  key={slide.video}
                  ref={(elem) => (videoRef.current[i] = elem)}
                  onEnded={() =>
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last")
                  }
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
              key={`outer-${i}`}
              ref={(elem) => (videoDivRef.current[i] = elem)}
              className="vid-span"
            >
              <span
                key={`inner-${i}`}
                ref={(elem) => (videoSpanRef.current[i] = elem)}
                className="vid-span"
              ></span>
            </span>
          ))}
        </div>
        <button className="prg-act-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt="act-img"
            className="act-img"
            onClick={
              isLastVideo
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
