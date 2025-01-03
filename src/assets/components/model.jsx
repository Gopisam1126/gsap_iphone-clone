import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "../compStyles/model.css";
import ModelView from "./modelView";
import { useState } from "react";
import { yellowImg } from "../utils";
import { models, sizes } from "../constants";
import { useRef } from "react";
import * as THREE from "three";
import { View } from "@react-three/drei";
import { div } from "three/tsl";
import { Canvas } from "@react-three/fiber";

function Model() {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "iPhone 15 pro in natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg,
  });

  // camera controls

  const camControlSm = useRef();
  const camControlLg = useRef();

  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  const [rotationSm, setRotationSm] = useState(0);
  const [rotationLg, setRotationLg] = useState(0);

  useGSAP(() => {
    gsap.to("#heading", {
      y: 0,
      opacity: 1,
      duration: 2,
    });
  }, []);

  return (
    <>
      <section className="model-main-section">
        <div className="main-div">
          <h1 className="model-sec-heading" id="heading">
            Take a Closer look.
          </h1>
          <div className="model-container">
            <div className="model-c">
              <ModelView
                index={1}
                groupRef={small}
                gsapType="view1"
                controlRef={camControlSm}
                setRotationState={setRotationSm}
                item={model}
                size={size}
              />
              <ModelView
                index={2}
                groupRef={large}
                gsapType="view2"
                controlRef={camControlLg}
                setRotationState={setRotationLg}
                item={model}
                size={size}
              />

              {/* canvas */}

              <Canvas
                className="canvas"
                id="canvas"
                style={{
                  position: "fixed",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  overflow: "hidden",
                }}
              >
                <View.Port />
              </Canvas>
            </div>

            <div className="cta-container">
              <p className="det-text">{model.title}</p>
              <div className="color-sel-c">
                <ul className="color-container">
                  {models.map((item, i) => (
                    <li
                      key={i}
                      className="cc-item"
                      style={{
                        backgroundColor: item.color[0],
                      }}
                      onClick={() => setModel(item)}
                    ></li>
                  ))}
                </ul>
                <button className="size-btn-c">
                  {sizes.map(({ label, value }) => (
                    <span
                      key={label}
                      className="size-btn"
                      style={{
                        backgroundColor:
                          size === value ? "white" : "transparent",
                        color: size === value ? "black" : "white",
                      }}
                      onClick={() => setSize(value)}
                    >
                      {label}
                    </span>
                  ))}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Model;
