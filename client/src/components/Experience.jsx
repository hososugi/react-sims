import { ContactShadows, Environment, Grid, OrbitControls, useCursor } from "@react-three/drei";
import { useAtom } from "jotai";
import { useState } from "react";
import * as THREE from "three";
import { CharacterComponent } from "./CharacterComponent";
import { charactersAtom, mapAtom, socket } from "./SocketManager";
import { Object } from "./Object";

export const Experience = () => {
  const [characters] = useAtom(charactersAtom);
  const [map] = useAtom(mapAtom);
  const [onFloor, setOnFloor] = useState(false);
  useCursor(onFloor);

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      <ContactShadows blur={2} />
      <OrbitControls />
      
      {
        console.log(`Experience map:`, map)
      }
      {
        map.objects.map((object, object_index) => (
          <Object key={`${object.name}-${object_index}`} object={object} />
        ))
      }
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.001}
        onClick={(e) => socket.emit("move", [e.point.x, 0, e.point.z])}
        onPointerEnter={() => setOnFloor(true)}
        onPointerLeave={() => setOnFloor(false)}
        position-x={map.size[0] / 2}
        position-z={map.size[1] / 2}
      >
        <planeGeometry args={map.size} />
        <meshStandardMaterial color="#4f9333" />
      </mesh>
      <Grid infiniteGrid fadeDistance={50} fadeStrength={5} />

      {characters.map((character) => (
          <CharacterComponent 
            key={character.id}
            id={character.id}
            position={new THREE.Vector3(...character.position)}
            cameraPosition={[10, 10, 10]}
            shirtColor={character.shirtColor}
          />
      ))}
    </>
  );
};
