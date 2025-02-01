import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { SocketManager } from "./components/SocketManager";

function App() {
  let cameraParams = {
    position: [8, 8, 8],
    fov: 30
  };

  return (
    <>
      <SocketManager />
      <Canvas shadows camera={cameraParams}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
