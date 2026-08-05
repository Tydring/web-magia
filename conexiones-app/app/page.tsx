import Image from "next/image";
import Fx from "@/components/Fx";
import InstagramReel from "@/components/InstagramReel";
import poster from "@/public/img/poster-conexiones-960x1280.jpg";

const TICKETS_URL =
  "https://bp.ticketplate.com/checkout/conexiones-202607311900/select/Gold";

export default function Page() {
  return (
    <div className="relative">
      <Fx />

      {/* El hilo: una linea roja continua, como las lineas del show. Decorativa. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5]">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 1000"
          preserveAspectRatio="none"
          fill="none"
        >
          {/*
            Version movil: el hilo recorre el margen derecho durante los bloques
            de texto y solo cruza el centro en los espacios entre secciones,
            para no chocar con la lectura.
          */}
          <path
            className="hilo-main hilo-path md:hidden"
            d="M 50 130 C 72 152, 90 168, 91 195 S 87 245, 90 285 C 93 325, 86 365, 90 405 S 90 445, 62 472 C 32 500, 26 542, 46 578 S 88 622, 90 662 C 92 700, 60 728, 50 758"
            stroke="#f2543f"
            strokeOpacity="0.28"
            strokeWidth="4.5"
            strokeLinecap="round"
            style={{ filter: "blur(3px)" }}
          />
          <path
            className="hilo-main hilo-path md:hidden"
            d="M 50 130 C 72 152, 90 168, 91 195 S 87 245, 90 285 C 93 325, 86 365, 90 405 S 90 445, 62 472 C 32 500, 26 542, 46 578 S 88 622, 90 662 C 92 700, 60 728, 50 758"
            stroke="#f2543f"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
          <path
            className="hilo-main hilo-path hidden md:block"
            d="M 55 128 C 30 180, 72 230, 45 295 S 26 390, 52 455 C 74 505, 30 565, 42 635 S 70 705, 50 758"
            stroke="#f2543f"
            strokeOpacity="0.28"
            strokeWidth="4.5"
            strokeLinecap="round"
            style={{ filter: "blur(3px)" }}
          />
          <path
            className="hilo-main hilo-path hidden md:block"
            d="M 55 128 C 30 180, 72 230, 45 295 S 26 390, 52 455 C 74 505, 30 565, 42 635 S 70 705, 50 758"
            stroke="#f2543f"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <main>
        {/* 1. HERO */}
        <section id="hero" className="relative z-10 flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <Image
              src={poster}
              alt=""
              fill
              priority
              sizes="100vw"
              className="-translate-y-[100px] scale-125 object-cover opacity-50 md:translate-y-0 md:scale-[1.4] md:opacity-30"
            />
            {/*
              Slot opcional de video: sustituir la imagen por un video mudo en loop
              con la misma imagen como poster.
              <video autoPlay muted loop playsInline poster="/img/poster-conexiones-960x1280.jpg"
                className="h-full w-full object-cover opacity-30">
                <source src="/video/conexiones-teaser.mp4" type="video/mp4" />
              </video>
            */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.12)_32%,rgba(0,0,0,0.7)_62%,#000_85%)]" />
            {/* Foco central solo en pantallas anchas: funde los bordes del flyer */}
            <div className="absolute inset-0 hidden bg-[linear-gradient(to_right,#000_10%,transparent_38%,transparent_62%,#000_90%)] md:block" />
          </div>

          {/* DRAFT COPY: Rafael reviews before launch */}
          <div className="relative z-10 flex flex-col items-center [text-shadow:0_1px_14px_rgba(0,0,0,0.85)]">
            <div className="overflow-hidden">
              <p
                data-line-inner
                className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent"
              >
                Magia y mentalismo en vivo
              </p>
            </div>
            <div className="mt-6 overflow-hidden">
              {/*
                Tipografia del titulo oficial (condensada, pesada, en caja alta).
                Si llega el PNG oficial del lockup, sustituir este h1 por la imagen
                con el texto en un span visualmente oculto.
              */}
              <h1
                data-line-inner
                className="font-display text-[16vw] font-normal uppercase leading-[0.95] tracking-[0.01em] text-ivory md:text-[10rem]"
              >
                Conexiones
              </h1>
            </div>

            {/* El hilo nace bajo el titulo */}
            <svg
              aria-hidden="true"
              className="mt-4 h-5 w-64 md:w-80"
              viewBox="0 0 320 20"
              fill="none"
            >
              <path
                id="hilo-hero-path"
                className="hilo-path"
                d="M 6 12 C 90 4, 150 18, 214 10 S 296 8, 314 13"
                stroke="#f2543f"
                strokeWidth="1.25"
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0 0 4px rgba(242, 84, 63, 0.55))" }}
              />
            </svg>

            <div className="mt-6 overflow-hidden">
              <p data-line-inner className="text-lg font-light italic text-ivory/90 md:text-xl">
                Un espectáculo de Rafael Gorrochotegui
              </p>
            </div>
            <div className="mt-3 overflow-hidden">
              <p
                data-line-inner
                className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent md:text-[12px] md:tracking-[0.22em]"
              >
                Sábado 29 de agosto · Teatro Ocho, Las Mercedes, Caracas
              </p>
            </div>
            <div className="mt-10 overflow-hidden">
              <div data-line-inner className="flex flex-col items-center gap-3">
                <a
                  href={TICKETS_URL}
                  className="cta-principal rounded-full bg-accent-deep px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-ivory hover:bg-[#d63031]"
                >
                  Comprar entradas
                </a>
                <span className="text-[11px] tracking-[0.15em] text-ivory/60">
                  Desde Ref. 10 + fee
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. MANIFIESTO. El hilo pasa por el margen en movil, por detras en desktop. */}
        <section
          id="manifiesto"
          data-reveal
          className="relative z-10 mx-auto flex min-h-[60svh] max-w-3xl items-center px-6 py-28 md:py-40"
        >
          {/* DRAFT COPY: Rafael reviews before launch */}
          <h2
            data-rc
            className="font-display text-5xl font-normal uppercase leading-[1.05] text-ivory md:text-7xl"
          >
            Hay hilos que no se ven.
            <br />
            <span className="text-accent-bright">Esta noche, sí.</span>
          </h2>
        </section>

        {/* 3. LA EXPERIENCIA. Constelacion de personas; en movil vive en los margenes y espacios entre bloques. */}
        <section id="experiencia" data-reveal className="relative px-6 py-28 md:py-36">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
            <svg
              className="h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                className="hilo-rama hilo-path md:hidden"
                d="M 91 4 C 82 7, 72 11, 64 18 M 64 18 C 52 24, 40 29, 30 34 M 91 30 C 90 37, 89 43, 88 50 M 88 50 C 70 55, 50 60, 34 66 M 34 66 C 40 74, 48 81, 55 88"
                stroke="#f2543f"
                strokeOpacity="0.3"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <path
                className="hilo-rama hilo-path hidden md:block"
                d="M 50 2 C 34 10, 24 14, 18 20 M 50 2 C 62 12, 72 18, 80 26 M 18 20 C 26 34, 32 44, 28 54 M 80 26 C 70 40, 60 50, 64 62 M 28 54 C 38 68, 46 76, 50 84 M 64 62 C 58 72, 52 78, 50 84"
                stroke="#f2543f"
                strokeOpacity="0.45"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
            <span className="hilo-punto absolute left-[88%] top-[8%] h-1.5 w-1.5 rounded-full bg-accent-bright md:left-[18%] md:top-[20%]" />
            <span className="hilo-punto absolute left-[64%] top-[18%] h-1.5 w-1.5 rounded-full bg-accent-bright md:left-[80%] md:top-[26%]" />
            <span className="hilo-punto absolute left-[30%] top-[34%] h-1.5 w-1.5 rounded-full bg-accent-bright md:left-[28%] md:top-[54%]" />
            <span className="hilo-punto absolute left-[88%] top-[50%] h-1.5 w-1.5 rounded-full bg-accent-bright md:left-[64%] md:top-[62%]" />
            <span className="hilo-punto absolute left-[34%] top-[66%] h-1 w-1 rounded-full bg-accent-bright md:left-[46%] md:top-[38%]" />
            <span className="hilo-punto absolute left-[55%] top-[88%] h-1.5 w-1.5 rounded-full bg-accent-bright md:left-[50%] md:top-[84%]" />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl">
            <p
              data-rc
              className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent"
            >
              La experiencia
            </p>

            {/* DRAFT COPY: Rafael reviews before launch */}
            <div className="mt-10 space-y-10 md:mt-14 md:space-y-16">
              <div data-rc className="max-w-md">
                <h3 className="font-display text-3xl font-normal uppercase text-ivory md:text-4xl">
                  Asombro
                </h3>
                <p className="mt-3 text-base leading-[1.7] text-ivory/75 md:text-lg">
                  Lo imposible, frente a ti.
                </p>
              </div>
              <div data-rc className="max-w-md md:ml-auto md:text-right">
                <h3 className="font-display text-3xl font-normal uppercase text-ivory md:text-4xl">
                  Emoción
                </h3>
                <p className="mt-3 text-base leading-[1.7] text-ivory/75 md:text-lg">
                  Momentos que se sienten personales.
                </p>
              </div>
              <div data-rc className="max-w-md md:mx-auto md:text-center">
                <h3 className="font-display text-3xl font-normal uppercase text-ivory md:text-4xl">
                  Conexión
                </h3>
                <p className="mt-3 text-base leading-[1.7] text-ivory/75 md:text-lg">
                  Sales distinto a como entraste.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. EL SHOW. Flyer oficial y sinopsis del cliente. */}
        <section id="show" data-reveal className="relative px-6 py-28 md:py-36">
          <div className="mx-auto grid max-w-4xl items-center gap-12 md:grid-cols-[5fr_6fr] md:gap-16">
            <div data-rc className="relative z-0">
              <div data-zoom className="glow-panel relative aspect-[3/4] overflow-hidden">
                <Image
                  src={poster}
                  alt="Flyer oficial de Conexiones: Rafael Gorrochotegui tras una jaula, con la mirada al frente"
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="relative z-10">
              <p
                data-rc
                className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent"
              >
                El show
              </p>
              {/* Copy del cliente, tomado de rafaelgmagia.com/conexiones */}
              <div className="mt-6 space-y-5 text-base leading-[1.8] text-ivory/75 md:text-lg">
                <p data-rc>
                  Hay hilos invisibles que nos unen y decisiones que nos marcan.{" "}
                  <strong className="font-semibold text-ivory">&ldquo;Conexiones&rdquo;</strong> no
                  es solo un show de magia; es un viaje interactivo al centro de lo que nos hace
                  humanos.
                </p>
                <p data-rc>
                  De la mano del galardonado mentalista{" "}
                  <strong className="font-semibold text-ivory">Rafael Gorrochotegui</strong>,
                  descubrirás que tus ojos son realmente la ventana del alma y que el azar no
                  existe.
                </p>
                <p data-rc>
                  Desde el misterio del tarot hasta la precisión matemática del Cubo Rubik, esta
                  experiencia de Producciones Dionisíacas te invita a romper tus propias jaulas
                  mentales.
                </p>
                <p data-rc>
                  Ven a vivir una inmersión total donde lo imposible se vuelve real frente a tus
                  ojos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. EL REEL. Embed oficial de Instagram, carga diferida. */}
        <section id="reel" data-reveal className="relative z-10 px-6 py-28 md:py-36">
          <div className="mx-auto max-w-2xl text-center">
            <p
              data-rc
              className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent"
            >
              Míralo en movimiento
            </p>
            <div data-rc className="mt-10">
              <InstagramReel url="https://www.instagram.com/reel/DYm2tfcuRST/" />
            </div>
          </div>
        </section>

        {/* VOCES: omitida. No existen testimonios ni citas de prensa en el proyecto. */}

        {/* 6. CIERRE */}
        <section
          id="cierre"
          data-reveal
          className="relative z-10 px-6 py-28 text-center md:py-40"
        >
          <div className="mx-auto max-w-2xl">
            {/* DRAFT COPY: Rafael reviews before launch */}
            <h2
              data-rc
              className="font-display text-4xl font-normal uppercase leading-[1.1] text-ivory md:text-6xl"
            >
              ¿Estás listo para conectar?
            </h2>

            <dl
              data-rc
              className="mx-auto mt-12 max-w-md space-y-4 text-[13px] uppercase tracking-[0.18em]"
            >
              <div className="flex items-baseline justify-between gap-6 border-b border-accent-dim/40 pb-3">
                <dt className="text-accent">Fecha</dt>
                <dd className="text-right text-ivory/85">Sábado 29 de agosto de 2026</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 border-b border-accent-dim/40 pb-3">
                <dt className="text-accent">Hora</dt>
                <dd className="text-right text-ivory/85">Puertas 6:00 PM · Show 7:00 PM</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 border-b border-accent-dim/40 pb-3">
                <dt className="text-accent">Lugar</dt>
                <dd className="text-right text-ivory/85">Teatro Ocho, Las Mercedes</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 border-b border-accent-dim/40 pb-3">
                <dt className="text-accent">Duración</dt>
                <dd className="text-right text-ivory/85">Una hora, aproximadamente</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 border-b border-accent-dim/40 pb-3">
                <dt className="text-accent">Edad</dt>
                <dd className="text-right text-ivory/85">Mayores de 12 años</dd>
              </div>
            </dl>

            <div className="mt-14 flex flex-col items-center gap-4">
              <a
                href={TICKETS_URL}
                className="cta-principal inline-block rounded-full bg-accent-deep px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-ivory hover:bg-[#d63031]"
              >
                Comprar entradas
              </a>
              <p className="text-[11px] tracking-[0.15em] text-ivory/60">
                Desde Ref. 10 + fee · Ventas finales, sin reembolso
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 7. FOOTER */}
      <footer className="relative z-10 border-t border-accent-dim/25 px-6 py-14 text-center">
        <nav aria-label="Contacto" className="flex items-center justify-center gap-8">
          <a
            href="https://instagram.com/rafaelgmagia"
            rel="noopener"
            className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent hover:text-accent-bright"
          >
            Instagram
          </a>
          <a
            href="mailto:rafaelgmagia@gmail.com"
            className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent hover:text-accent-bright"
          >
            Escríbenos
          </a>
        </nav>
        <p className="mt-8 text-[11px] leading-[1.9] tracking-[0.08em] text-ivory/45">
          Una producción de Producciones Dionisíacas
          <br />
          Producción general: Dennys Alexander Ledezma · Asistencia de escena: Gadir Garmendia
          <br />
          Asistencia general: Rudén Rodríguez · Fotografía, arte e iluminación: Shonny Romero
        </p>
        <p className="mt-6 text-[11px] tracking-[0.12em] text-ivory/35">
          © 2026 Rafael Gorrochotegui · Caracas, Venezuela
        </p>
      </footer>
    </div>
  );
}
