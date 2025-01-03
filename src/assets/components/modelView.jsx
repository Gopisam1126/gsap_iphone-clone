import { Html, View } from "@react-three/drei";
import Lights from "../components/lights";
import "../compStyles/modelView.css";
import { Suspense } from "react";
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
  
  return (
    <View
      index={index}
      id={gsapType}
      className={`viewport-main ${index === 2} ? 'right-t' : ''`}
    >
      <ambientLight intensity={1}/>
      <directionalLight position={[0, 2, 4]} />
      <perspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <Suspense fallback={<Html>Loading...</Html>}>
        <Iphone scale={20} />
      </Suspense>
    </View>
  );
}

export default ModelView;
