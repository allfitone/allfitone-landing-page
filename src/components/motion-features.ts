/**
 * The Motion features the landing uses, in a module of their own so `LazyMotion`
 * fetches them after the page is interactive. `domAnimation` covers animations
 * and springs; layout animations and drag (`domMax`) stay out of the bundle.
 */
export { domAnimation as default } from "motion/react";
