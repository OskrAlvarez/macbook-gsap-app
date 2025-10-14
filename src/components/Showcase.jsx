import { useGSAP } from "@gsap/react"
import { useMediaQuery } from "react-responsive"
import gsap from "gsap"


const Showcase = () => {
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' })

  useGSAP(() => {
    if (!isTablet) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#showcase',
          start: 'top top', // when the top of the screen reaches the top of the section(#showcase)
          end: 'bottom top', // when the bottom of the screen reaches the top of the section(#showcase)
          scrub: true, // animate the timeline when user scrol it
          pin: true // pining the animation
        }
      })
      timeline
        .to('.mask img', {
          transform: 'scale(1.1)'
        }).to('.content', {
          opacity: 1,
          y: 0,
          ease: 'power1.in'
        })
    }
  }, [isTablet])
  return (
    <section id="showcase">
      <div className="media">
        <video src="/videos/game.mp4" loop muted playsInline autoPlay/>
        <div className="mask">
          <img src="/mask-logo.svg" alt="Mask Logo" />
        </div>
      </div>
      <div className="content">
        <div className="wrapper">
          <div className="lg:max-w-md">
            <h2>Rendimiento Pro a fondo.</h2>
            <div className="space-y-5 mt-7 pe-10">
              <p>Presentando { " " }
                <span className="text-white">
                  M4, La nueva generación de Apple Silicon
                </span>
              </p>
              <p>
                Impulsa Apple Intelligence en el iPad Pro, para que puedas escribir, crear y lograr más con facilidad. Todo en un diseño increíblemente delgado, ligero y potente.
              </p>
              <p>
                Un nuevo motor de visualización ofrece una precisión, una precisión de color y un brillo impresionantes. Y una GPU de última generación con trazado de rayos acelerado por hardware pone a tu alcance gráficos de consola.
              </p>
              <p className="text-primary">Obten más información sobre Apple Intelligence</p>
            </div>
          </div>
          <div className="mx-w-3xs space-y-14">
            <div className="space-y-2">
              <h3>4x</h3>
              <p>mas rapida</p>
              <p>Rendimiento de renderizado superior al M2</p>
            </div>
            <div className="space-y-2">
              <h3>1.5x</h3>
              <p>mas rapida</p>
              <p>Rendimiento de CPU superior al M2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Showcase
