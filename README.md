# Fizz Scroll Animation

A scroll-driven hero section built with React, Tailwind CSS and GSAP. A letter-spaced headline and animated impact stats introduce the page, then a pinned scroll sequence sends a soda can travelling, rotating and catching the light as you scroll.

**Live demo:** https://swati0419.github.io/fizz-scroll-animation/

Inspired by the [car scroll animation](https://paraschaturvedi.github.io/car-scroll-animation) reference. The main object here is a CSS-built can instead of a car, but the layout and interaction logic follow the same idea.


## Features

- **Hero layout:** fills the first screen with the headline `W E L C O M E  I T Z  F I Z Z` and three impact stats below it.
- **Load animation:** the headline letters stagger in, the can fades in, and the stats rise one by one while their numbers count up.
- **Scroll-driven motion:** the hero pins while a single GSAP timeline, scrubbed to scroll position, moves, rotates and scales the can. Scrolling back up reverses it.
- **Depth effects:** a light sheen sweeps across the can as it turns, its floor shadow shrinks and fades as it lifts, and decorative rings move at different speeds (parallax).
- **Stat progress bars:** a thin bar under each stat fills in sequence as you scroll.
- **Experience section:** a staggered reveal and a live scroll-progress readout.
- **Responsive:** the headline wraps into three lines on small screens, and can sizes and motion distances adapt to the viewport.
- **Accessible:** `prefers-reduced-motion` is respected (content is shown in its final state with no animation), and the headline has an `aria-label`.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v4 + custom CSS |
| Animation | GSAP, ScrollTrigger |
| Deployment | GitHub Pages |

## How the animation works

- **One scroll timeline.** Every scroll-linked effect (can travel, rotation, sheen, shadow, parallax rings, stat bars, fade-out) lives in a single pinned timeline in `Hero.jsx`, so they stay in sync.
- **Scroll is the clock.** The timeline uses `scrub: 1`, so motion follows scroll position with one second of smoothing instead of playing on a timer.
- **Transforms only.** Motion uses `x`, `y`, `scale`, `rotation` and `opacity`, which the browser can animate without recalculating layout.
- **No per-scroll measurements.** Distances are functions evaluated on refresh (`invalidateOnRefresh`), so nothing is measured on every scroll event.
- **Layered transforms.** The can is split into nested wrappers (`.hero-object` for travel and scale, `.can-rotor` for rotation, `.hero-can-inner` for the intro) so the intro and scroll animations never fight over the same property.
- **Responsive and accessible.** `gsap.matchMedia()` swaps values for mobile and skips all motion for users who prefer reduced motion.

## Project structure

```
src/
├── components/
│   ├── Hero.jsx          # intro animation + pinned scroll timeline
│   └── Experience.jsx    # reveal + scroll-progress readout
├── App.jsx
├── main.jsx
└── index.css             # Tailwind import, design tokens, can styles
```
