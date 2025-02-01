import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react';
import { SkeletonUtils } from 'three-stdlib';

export const Object = ({object}) => {
    console.log("Ojected.jsx: passed object params:", object);
    const {objectFile, name, size, position, rotation} = object;
    const {scene} = useGLTF(`models/game_objects/${objectFile}.glb`);
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

    return <primitive object={clone}
        position={position}
        rotation={rotation}
        />;
}