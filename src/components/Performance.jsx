import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
  performanceImages,
  performanceImgPositions,
} from "../constants/index.js";
import { useMediaQuery } from "react-responsive";

const Performance = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      // Text Animation
      gsap.fromTo(
        ".content p",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".content p",
            start: "top bottom",
            end: "top center",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      if (isMobile) return;

      // Image Positioning Timeline
      const tl = gsap.timeline({
        defaults: { duration: 2, ease: "power1.inOut", overwrite: "auto" },
        scrollTrigger: {
          trigger: sectionEl,
          start: "top bottom",
          end: "center center",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Position Each Performance Image
      performanceImgPositions.forEach((item) => {
        if (item.id === "p5") return;

        const selector = `.${item.id}`;
        const vars = {};

        if (typeof item.left === "number") vars.left = `${item.left}%`;
        if (typeof item.right === "number") vars.right = `${item.right}%`;
        if (typeof item.bottom === "number") vars.bottom = `${item.bottom}%`;

        if (item.transform) vars.transform = item.transform;

        tl.to(selector, vars, 0);
      });
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );
  return (
    <section ref={sectionRef} id="performance">
      <h2>Rendimiento gráfico de primer nivel. Todo juega a tu favor.</h2>

      <div className="wrapper">
        {performanceImages.map((item, index) => (
          <img
            key={index}
            src={item.src}
            className={item.id}
            alt={item.alt || `Performance Image #${index + 1}`}
          />
        ))}
      </div>

      <div className="content">
        <p>
          Ejecuta flujos de trabajo con gráficos intensivos con una capacidad de
          respuesta que sigue el ritmo de tu imaginación. La familia de chips M4
          incluye una GPU con un motor de trazado de rayos acelerado por
          hardware de segunda generación que renderiza las imágenes más rápido,
          para que los{" "}
          <span className="text-white">
            juegos se sientan más inmersivos y realistas que nunca.
          </span>{" "}
          Además, el almacenamiento en caché dinámico optimiza la memoria rápida
          en el chip para aumentar drásticamente el uso promedio de la GPU, lo
          que genera un gran aumento de rendimiento para las aplicaciones y
          juegos profesionales más exigentes.
        </p>
      </div>
    </section>
  );
};
export default Performance;
