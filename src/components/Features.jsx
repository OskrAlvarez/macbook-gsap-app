import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLights";

import { features, featureSequence } from "../constants/index";
import clsx from "clsx";
import { Suspense, useEffect, useRef } from "react";
import { Html } from "@react-three/drei";
import MacbookModel from "./models/Macbook";
import { useMediaQuery } from "react-responsive";
import useMacbookStore from "../store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const ModelScroll = () => {
  const groupRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const { setTextureVideo } = useMacbookStore();

  // Preload all the feature videos during component mount
  useEffect(() => {
    featureSequence.forEach((feature) => {
      const v = document.createElement("video");

      Object.assign(v, {
        src: feature.videoPath,
        muted: true,
        playsInline: true,
        preload: "auto",
        crossOrigin: "anonymous",
      });

      v.load();
    });
  }, []);

  useGSAP(() => {
    // 3D Model Rotation Animation
    const modelTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#f-canvas",
        start: "top top", // <- when the top of the component hits the top of the viewport
        end: "bottom top", // <- when the bottom of the component hits the top of the viewport
        scrub: 1,
        pin: true,
      },
    });

    // Sync the feature Content
    const contentTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#f-canvas",
        start: "top center", // <- when the top of the component hits the center of the viewport
        end: "bottom top", // <- when the bottom of the component hits the top of the viewport
        scrub: 1,
      },
    });

    // 3D Spin
    if (groupRef.current) {
      modelTimeline.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        ease: "power1.inOut",
      });
    }

    // Content & Texture Sync
    contentTimeline
      .call(() => setTextureVideo("/videos/feature-1.mp4"))
      .to(".box1", {
        opacity: 1,
        y: 0,
        delay: .5,
      })
      .call(() => setTextureVideo("/videos/feature-2.mp4"))
      .to(".box2", {
        opacity: 1,
        y: 0,
      })
      .call(() => setTextureVideo("/videos/feature-3.mp4"))
      .to(".box3", {
        opacity: 1,
        y: 0,
      })
      .call(() => setTextureVideo("/videos/feature-4.mp4"))
      .to(".box4", {
        opacity: 1,
        y: 0,
      })
      .call(() => setTextureVideo("/videos/feature-5.mp4"))
      .to(".box5", {
        opacity: 1,
        y: 0,
      });
  }, []);

  return (
    <group ref={groupRef}>
      <Suspense
        fallback={
          <Html>
            <p className="text-xl font-bold text-white">Cargando...</p>
          </Html>
        }
      >
        <MacbookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]} />
      </Suspense>
    </group>
  );
};

const Features = () => {
  return (
    <section id="features">
      <h2>Míralo todo bajo una nueva perspectiva.</h2>
      <Canvas id="f-canvas" camera={{}}>
        <StudioLights />
        <ambientLight intensity={0.5} />

        {/* 3D Model */}
        <ModelScroll />
      </Canvas>

      <div className="absolute inset-0">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={clsx("box", `box${index + 1}`, feature.styles)}
          >
            <img src={feature.icon} alt={feature.highlight} />
            <p>
              <span className="text-white">{feature.highlight}{' '}</span>
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Features;
