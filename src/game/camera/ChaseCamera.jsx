/* eslint-disable react/no-unknown-property */
/**
 * ChaseCamera.jsx
 * ───────────────
 * Smooth third-person chase camera with dynamic offset based on speed.
 * Initializes to the correct position behind the vehicle on mount.
 */
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const TRACK_RADIUS = 50;
const CAMERA_OFFSET = new THREE.Vector3(0, 6, -14);
const CAMERA_OFFSET_BOOST = new THREE.Vector3(0, 7, -18);
const LOOK_AHEAD = new THREE.Vector3(0, 2, 8);
const LERP_FACTOR = 0.06;

const ChaseCamera = ({ target }) => {
  const { camera } = useThree();
  const idealPos = useRef(new THREE.Vector3());
  const idealLook = useRef(new THREE.Vector3());
  const initialized = useRef(false);

  // Initialize camera position behind the car immediately
  useEffect(() => {
    // Car starts at [TRACK_RADIUS, 0, 0] facing tangent to circle
    const startPos = new THREE.Vector3(TRACK_RADIUS, 0, 0);
    const startRotation = 0;

    const rotatedOffset = CAMERA_OFFSET.clone().applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      startRotation
    );
    const camPos = startPos.clone().add(rotatedOffset);

    const rotatedLook = LOOK_AHEAD.clone().applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      startRotation
    );
    const lookAt = startPos.clone().add(rotatedLook);

    camera.position.copy(camPos);
    camera.lookAt(lookAt);
    idealPos.current.copy(camPos);
    idealLook.current.copy(lookAt);
    initialized.current = true;
  }, [camera]);

  useFrame(() => {
    if (!target?.current || !initialized.current) return;

    const { position, rotation, speed, isBoosting } = target.current;
    const pos = new THREE.Vector3(position[0], position[1], position[2]);

    // Choose offset based on speed
    const offset = isBoosting ? CAMERA_OFFSET_BOOST : CAMERA_OFFSET;

    // Calculate ideal camera position (behind and above vehicle)
    const rotatedOffset = offset.clone().applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      rotation
    );
    const targetCamPos = pos.clone().add(rotatedOffset);

    // Calculate look-at point (ahead of vehicle)
    const rotatedLook = LOOK_AHEAD.clone().applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      rotation
    );
    const targetLookAt = pos.clone().add(rotatedLook);

    // Smooth interpolation
    const lerpSpeed = LERP_FACTOR + (speed || 0) * 0.02;
    idealPos.current.lerp(targetCamPos, lerpSpeed);
    idealLook.current.lerp(targetLookAt, lerpSpeed * 1.5);

    // Apply to camera
    camera.position.copy(idealPos.current);
    camera.lookAt(idealLook.current);
  });

  return null;
};

export default ChaseCamera;
