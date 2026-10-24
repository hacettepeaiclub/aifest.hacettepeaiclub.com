import { useState, useEffect, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float, Environment, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';

// 1. Gün: 3 Kasım 2026 Salı, 09:30 (Kayıt & Karşılama Başlangıcı)
const TARGET_DATE = new Date('2026-11-03T09:30:00').getTime();

function TimeBlock({ value, label, position, index }: { value: string, label: string, position: [number, number, number], index: number }) {
  const pivotRef = useRef<THREE.Group>(null);
  const pivotHeight = 4.5;

  useFrame((state) => {
    if (!pivotRef.current) return;

    // Sequential collision wave (Domino/Caterpillar effect)
    const speed = 4;
    const cycle = 8; // 0..4 right, 4..8 left
    const maxGap = 0.5; // Gap between balls when radius is 1.0

    let t = (state.clock.elapsedTime * speed) % cycle;
    let offset = 0;

    if (t < 4) {
      // Moving right sequence
      const startT = index;
      if (t <= startT) offset = 0;
      else if (t < startT + 1) offset = (t - startT) * maxGap; // Linear movement
      else offset = maxGap;
    } else {
      // Moving left sequence (starts from rightmost ball)
      const startT = 4 + (3 - index);
      if (t <= startT) offset = maxGap;
      else if (t < startT + 1) offset = (1 - (t - startT)) * maxGap; // Linear movement
      else offset = 0;
    }

    pivotRef.current.position.x = offset;
    pivotRef.current.rotation.z = 0; // reset rotation
  });

  return (
    <group position={position}>
      {/* Pivot point at top */}
      <group position={[0, pivotHeight, 0]} ref={pivotRef}>
        {/* Block Content */}
        <group position={[0, -pivotHeight, 0]}>
          {/* Glass Sphere - Radius 1.0 for gap spacing */}
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[1.0, 32, 32]} />
            <meshPhysicalMaterial
              color="#4E439B"
              metalness={0.1}
              roughness={0.2}
              transmission={0.8}
              thickness={0.5}
              ior={1.5}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </mesh>

          {/* Number - Perfectly centered */}
          <Center position={[0.15, 0.14, 1.25]}>
            <Text3D
              font={`${import.meta.env.BASE_URL}helvetiker_regular.typeface.json`}
              size={0.75}
              height={0.15}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.02}
              bevelSize={0.02}
              bevelOffset={0}
              bevelSegments={5}
            >
              {value}
              <meshStandardMaterial color="#ffffff" metalness={1.69} roughness={0.2} />
            </Text3D>
          </Center>

          {/* Label - Brought significantly forward */}
          <Text
            position={[0.2, -0.5, 1.25]}
            fontSize={0.22}
            color="#FDE68A"
            anchorX="center"
            anchorY="middle"
          >
            {label}
          </Text>
        </group>
      </group>
    </group>
  );
}

function ResponsiveGroup({ children }: { children: React.ReactNode }) {
  const { viewport } = useThree();
  // Total width of blocks is about 8 units. Fit to viewport.
  const scale = Math.min(1, viewport.width / 9);

  return <group scale={scale}>{children}</group>;
}

export default function Countdown3D() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    // Initial call
    const now = new Date().getTime();
    const distance = TARGET_DATE - now;
    if (distance > 0) {
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'GÜN', value: timeLeft.days.toString().padStart(2, '0') },
    { label: 'SAAT', value: timeLeft.hours.toString().padStart(2, '0') },
    { label: 'DAKİKA', value: timeLeft.minutes.toString().padStart(2, '0') },
    { label: 'SANİYE', value: timeLeft.seconds.toString().padStart(2, '0') }
  ];

  return (
    <div className="w-full h-[180px] sm:h-[250px] md:h-[300px] flex items-center justify-center my-4 sm:my-8 relative z-30">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

        {/* Environment for glass reflections */}
        <Environment preset="city" />

        <ResponsiveGroup>
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>

            {/* We spread them horizontally with 2.5 distance exactly matching 1.25 radius */}
            <TimeBlock value={timeUnits[0].value} label={timeUnits[0].label} position={[-3.75, 0, 0]} index={0} />
            <TimeBlock value={timeUnits[1].value} label={timeUnits[1].label} position={[-1.25, 0, 0]} index={1} />
            <TimeBlock value={timeUnits[2].value} label={timeUnits[2].label} position={[1.25, 0, 0]} index={2} />
            <TimeBlock value={timeUnits[3].value} label={timeUnits[3].label} position={[3.75, 0, 0]} index={3} />
          </Float>
        </ResponsiveGroup>

        {/* Soft shadow on the "floor" */}
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} far={10} />
      </Canvas>
    </div>
  );
}
