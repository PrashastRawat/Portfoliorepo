import PixelBg from "../components/PixelBg";
const About = ({ image }) => {
  return (
    <section className="relative bg-bg px-6 lg:px-11 py-16 lg:py-20 overflow-hidden">
      <PixelBg />
      <div className="relative mx-auto max-w-6xl border-l border-line pl-5 lg:pl-6">
        <p className="font-mono text-xs tracking-widest text-accent mb-4">
          ABOUT // 002
        </p>
        <h1 className="font-mono font-extrabold text-4xl lg:text-6xl text-ink mb-8">
          ABOUT ME
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 justify-between max-w-5xl">
          <div className="flex-1 min-w-0">
            <div className="border-2 border-ink bg-bg p-5 lg:p-6 mb-6 max-w-2xl shadow-[4px_4px_0_#05050591] lg:shadow-[16px_16px_0_#05050591]">
              <p className="text-sm text-muted leading-relaxed">
                I got into web development mostly by messing things up and then trying
                to figure out what I broke. I never went through a bootcamp or studied
                it formally. I just started building things, reading a ridiculous
                amount of documentation, and spending way too many nights staring at
                an error because I refused to let it win. These days, I work across
                the stack with MongoDB, Express, React, and Node. I've never really
                been someone who picks a side between frontend and backend. I actually
                enjoy seeing how the whole thing works together — from clicking a
                button on a page to the request hitting the backend, the database
                getting updated, and the result making its way back to the screen.
              </p>
            </div>

            <div className="border-2 border-ink bg-bg p-5 lg:p-6 max-w-2xl shadow-[4px_4px_0_#05050591] lg:shadow-[16px_16px_0_#05050591]">
              <p className="text-sm text-muted leading-relaxed">
                When I'm not coding, I'm usually training or playing sports. Fitness
                has become a pretty big part of my life, and I think it's taught me a
                lot about how I approach development too. You're not going to be
                motivated every day, and things aren't always going to go your way.
                Sometimes you just have to keep showing up, put in the work, and get a
                little better each time.
              </p>
            </div>
          </div>

          {image && (
            <img
              src={image}
              alt="Portrait of Prashast Rawat"
              className="w-full max-w-sm lg:h-100 lg:w-100 object-cover shrink-0 shadow-[4px_4px_0_#05050591] lg:shadow-[16px_16px_0_#05050591]"
            />
          )}
        </div>
        
      </div>
      
    </section>
    
  );
};

export default About;