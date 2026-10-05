import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = ["WELCOME", "ITZ", "FIZZ"];

const STATS = [
    { value: 85, label: "Faster checkout at pick up points" },
    { value: 92, label: "Fewer customer phone calls" },
    { value: 78, label: "Increase in repeat orders" },
];

function Hero() {
    const heroRef = useRef(null);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();

        mm.add(
            {
                motion: "(prefers-reduced-motion: no-preference)",
                mobile: "(max-width: 640px)",
            },
            (context) => {
                const { motion, mobile } = context.conditions;

                if (!motion) return;

                gsap
                    .timeline({ defaults: { ease: "power3.out" } })
                    .from(".hero-letter", {
                        autoAlpha: 0,
                        y: 40,
                        duration: 0.8,
                        stagger: 0.06,
                    })
                    .from(".ground-wrap", { autoAlpha: 0, duration: 1 }, "-=0.4")
                    .from(
                        ".hero-can-inner",
                        { autoAlpha: 0, scale: 0.9, y: 30, duration: 1 },
                        "<"
                    )
                    .from(
                        ".stat",
                        { autoAlpha: 0, y: 30, duration: 0.8, stagger: 0.25 },
                        "-=0.5"
                    )
                    .from(
                        ".stat-number",
                        {
                            textContent: 0,
                            snap: { textContent: 1 },
                            duration: 1.5,
                            stagger: 0.25,
                            ease: "power2.out",
                        },
                        "<"
                    );

                const canX = () => window.innerWidth * (mobile ? 0.18 : 0.24);
                const canY = () => -window.innerHeight * (mobile ? 0.42 : 0.4);

                gsap.set(".stat-bar", { scaleX: 0, transformOrigin: "left center" });

                gsap
                    .timeline({
                        defaults: { ease: "none" },
                        scrollTrigger: {
                            trigger: heroRef.current,
                            start: "top top",
                            end: "+=150%",
                            scrub: 1,
                            pin: true,
                            anticipatePin: 1,
                            invalidateOnRefresh: true,
                        },
                    })
                    
                    .to(".hero-object", { x: canX, y: canY, scale: 1.15, duration: 1 }, 0)
                    .to(".can-rotor", { rotation: 70, duration: 1 }, 0)
                    .to(".can-sheen", { xPercent: 420, duration: 1 }, 0)
                    .to(".can-ground", { x: canX, scaleX: 0.5, autoAlpha: 0, duration: 1 }, 0)
                    .to(".hero-title", { y: -120, autoAlpha: 0.25, duration: 0.6 }, 0)
                    .to(".shape-one", { y: -200, duration: 1 }, 0)
                    .to(".shape-two", { y: -90, duration: 1 }, 0)
                    .to(".shape-three", { y: -320, duration: 1 }, 0)
                    .to(".stat-bar", { scaleX: 1, duration: 0.25, stagger: 0.2 }, 0.1)
                    .to(".scroll-hint", { autoAlpha: 0, duration: 0.08 }, 0)
                    .to(".hero-fade", { autoAlpha: 0, duration: 0.15 }, 0.85);
            },
            heroRef.current
        );
        document.fonts?.ready.then(() => ScrollTrigger.refresh());

        return () => mm.revert();
    }, []);

    return (
        <section ref={heroRef} className="hero relative h-svh overflow-hidden">
            <div className="floating-shape shape-one" aria-hidden="true" />
            <div className="floating-shape shape-two" aria-hidden="true" />
            <div className="floating-shape shape-three" aria-hidden="true" />

            <div className="hero-stage hero-fade relative z-10 flex h-full flex-col items-center justify-center px-6 md:px-12">
                <h1
                    aria-label="Welcome Itz Fizz"
                    className="hero-title flex w-full flex-wrap justify-center gap-x-[0.7em] gap-y-[0.2em] text-center font-display font-bold uppercase"
                >
                    {HEADLINE.map((word) => (
                        <span
                            key={word}
                            aria-hidden="true"
                            className="inline-flex whitespace-nowrap -mr-[0.2em]"
                        >
                            {[...word].map((char, i) => (
                                <span key={i} className="hero-letter">
                                    {char}
                                </span>
                            ))}
                        </span>
                    ))}
                </h1>

                <div className="stats-container relative z-30 mt-14 flex flex-wrap justify-center gap-x-10 gap-y-8 text-center md:mt-16 md:gap-x-24">
                    {STATS.map(({ value, label }) => (
                        <div key={label} className="stat max-w-[10.5rem]">
                            <p className="font-display text-4xl font-medium tracking-tight tabular-nums md:text-6xl">
                                <span className="stat-number">{value}</span>%
                            </p>
                            <p className="mt-3 text-xs leading-5 text-gray-400 md:text-sm">
                                {label}
                            </p>
                            <div className="mx-auto mt-4 h-px w-16 bg-white/15">
                                <div className="stat-bar h-full w-full bg-white" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2">
                <div className="ground-wrap">
                    <div className="can-ground" />
                </div>
            </div>

            <div className="hero-fade absolute bottom-4 left-1/2 z-20 -translate-x-1/2">
                <div className="hero-object">
                    <div className="can-rotor">
                        <div className="hero-can-inner">
                            <div className="fizz-can" role="img" aria-label="Fizz can">
                                <div className="can-top">FIZZ</div>
                                <div className="can-body" aria-hidden="true">
                                    <span>F</span>
                                    <span>I</span>
                                    <span>Z</span>
                                    <span>Z</span>
                                </div>
                                <div className="can-bottom" />
                                <div className="can-sheen" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="scroll-hint absolute bottom-6 left-6 z-10 text-xs tracking-[0.3em] text-gray-400 md:left-12">
                Scroll
            </div>
        </section>
    );
}

export default Hero;
