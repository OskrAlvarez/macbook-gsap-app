import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";

const Highlights = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' })

  useGSAP(() => {
    gsap.to(['.left-column', '.right-column'], {
      scrollTrigger: {
        trigger: '#highlights',
        start: isMobile ? 'bottom bottom' : 'top top'
      },
      y: 0,
      opacity: 1,
      stagger: 0.5,
      duration: 1,
      ease: 'power1.inOut'
    })
  })
  return (
    <section id="highlights">
      <h2>Es un gran momento para cambiar tu Mac.</h2>
      <h3>Esto es lo que te ofrece la nueva MacBook Pro.</h3>

      <div className="masonry">
        <div className="left-column">
          <div>
            <img src="/laptop.png" alt="Laptop" />
            <p>
              Vuela a través de tareas exigentes hasta 9.8x veces más rápido.
            </p>
          </div>
          <div>
            <img src="/sun.png" alt="Sun" />
            <p>
              Una espectacular <br /> pantalla Liquid Retina <br /> XDR.
            </p>
          </div>
        </div>
        <div className="right-column">
          <div className="apple-gradient">
            <img src="/ai.png" alt="AI" />
            <p>
              Diseñada para <br /> <span>Apple Inteligence.</span>
            </p>
          </div>
          <div>
            <img src="/battery.png" alt="Battery" />
            <p>
              Hasta <span className="green-gradient"> 14 horas </span> más de
              batería. <span className="text-dark-100">{' '}(Hasta 24 horas en total).</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Highlights;
