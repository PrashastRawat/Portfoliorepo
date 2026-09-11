import PixelBg from "./PixelBg";

const Hero = () => {
  return (
    <section className="relative bg-bg px-11 lg:px-20 py-24 lg:py-32 overflow-hidden">
      <PixelBg />

      <div className="absolute top-28 right-16 lg:right-32 h-28 w-28 lg:h-36 lg:w-36 grid grid-cols-8 grid-rows-8">
        <div className="col-start-3 col-end-7 row-start-1 row-end-3 bg-accent" />
        <div className="col-start-2 col-end-8 row-start-3 row-end-7 bg-accent" />
        <div className="col-start-3 col-end-7 row-start-7 row-end-9 bg-accent" />
      </div>

      <div className="relative ml-16 lg:ml-24 max-w-md lg:max-w-xl border-l border-line pl-6 lg:pl-8">
        <p className="font-mono text-xs lg:text-sm tracking-widest text-accent mb-4">
          SELECTED WORK // 001
        </p>
        <h1 className="font-mono font-extrabold text-4xl lg:text-6xl leading-snug lg:leading-tight text-ink mb-6">
          QUIET CODE.<br />
          CONSIDERED<br />
          DESIGN.
        </h1>
        <p className="text-sm lg:text-base text-muted leading-relaxed mb-8 lg:max-w-md">
          I build full-stack web apps with a bias toward restraint — clean systems,
          deliberate interfaces, nothing decorative left unexplained.
        </p>
        <div className="flex gap-3">
          <a href="/projects" className="bg-accent text-white text-xs lg:text-sm font-bold tracking-wide px-5 lg:px-7 py-2.5 lg:py-3.5">
            VIEW WORK
          </a>
          <a href="/about" className="border border-ink text-ink text-xs lg:text-sm font-bold tracking-wide px-5 lg:px-7 py-2.5 lg:py-3.5">
            ABOUT ME
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;