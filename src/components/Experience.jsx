import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Experience() {
    const sectionRef = useRef(null);
    const percentRef = useRef(null);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();
        const progressTrigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom bottom",
            onUpdate: (self) => {
                if (percentRef.current) {
                    percentRef.current.textContent = `${Math.round(self.progress * 100)}%`;
                }
            },
        });

        mm.add(
            "(prefers-reduced-motion: no-preference)",
            () => {
                gsap.from(".exp-item", {
                    autoAlpha: 0,
                    y: 60,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                });

                gsap.fromTo(
                    ".progress-line",
                    { scaleX: 0, transformOrigin: "left center" },
                    {
                        scaleX: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top bottom",
                            end: "bottom bottom",
                            scrub: true,
                        },
                    }
                );
            },
            sectionRef.current
        );

        return () => {
            progressTrigger.kill();
            mm.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="about-section relative flex min-h-svh items-center overflow-hidden bg-paper px-6 py-24 text-black md:px-16">
        
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-black/10" />
                <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full border border-black/10" />
            </div>

            <div className="experience-content mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-2 md:items-center md:gap-16">
                <h2 className="exp-item font-display text-4xl font-medium leading-tight text-white md:text-6xl">
                    Built to
                    <br />
                    move.
                </h2>

                <div>
                    <p className="exp-item max-w-lg text-lg leading-8 text-gray-700">
                        Scroll down and the can travels, turns and catches the light on its
                        own path. Its position, rotation and shadow are all tied to where you
                        are on the page, so it stops when you stop and reverses when you
                        scroll back.
                    </p>

                    <div className="exp-item mt-10">
                        <div className="h-px w-full bg-black/15">
                            <div className="progress-line h-full w-full bg-black" />
                        </div>

                        <p className="mt-4 flex justify-between text-sm text-gray-700">
                            <span>Scroll progress</span>
                            <span ref={percentRef} className="tabular-nums">
                                0%
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Experience;
