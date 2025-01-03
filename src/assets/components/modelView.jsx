/* eslint-disable react/prop-types */
import { Html, OrbitControls, View } from "@react-three/drei";
import Lights from "../components/lights";
import "../compStyles/modelView.css";
import { Suspense, useEffect } from "react";
import Iphone from "./iPhone";

function ModelView({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
  size,
}) {
  useEffect(() => {
    if (controlRef.current) {
      controlRef.current.target.set(0, 0, 0);
      controlRef.current.update();
    }
  }, [controlRef]);

  return (
    <View
      index={index}
      id={gsapType}
      className={`viewport-main ${index === 2 ? "right-t" : ""}`}
    >
      <ambientLight intensity={1} />
      <perspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <OrbitControls
        makeDefault
        ref={controlRef}
        enablePan={false}
        enableZoom={false}
        rotateSpeed={0.4}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />
      <group
        ref={groupRef}
        name={index === 1 ? "small" : "large"}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Html>Loading...</Html>}>
          <Iphone
            scale={index === 1 ? [25, 25, 25] : [30, 30, 30]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
}

export default ModelView;
