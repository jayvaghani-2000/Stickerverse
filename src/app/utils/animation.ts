import {
  AnimationProps,
  MotionProps,
  TargetAndTransition,
  easeOut,
} from "framer-motion";
import seedrandom from "seedrandom";
import { getPlatform } from "./getPlatform";

const { isIOS, isMobile } = getPlatform();
export const titleAnimation: AnimationProps = isIOS
  ? {}
  : {
      initial: { x: 20, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { duration: 0.15 },
    };

export const gleanDescriptionAnimation: AnimationProps = isIOS
  ? {}
  : {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { delay: 0.1, duration: 0.1, ease: easeOut },
    };

export const profileDescriptionAnimation: AnimationProps = isIOS
  ? {}
  : {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { delay: 0.1, duration: 0.3, ease: easeOut },
    };

export const gleanMediaAnimation: AnimationProps = isIOS
  ? {}
  : {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: {
        easings: ["anticipate"],
      },
    };

export const avatarAnimation: AnimationProps = isIOS
  ? {}
  : {
      initial: { opacity: 0, scale: 0.75, rotateZ: 20 },
      animate: { opacity: 1, scale: 1, rotateZ: 0 },
    };

export const delayAnimation = (i: number): AnimationProps & MotionProps => ({
  initial: { x: 20, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.2, delay: 0.1 + 0.05 * i },
  },
});

export const productAnimation = (
  id: string
): AnimationProps &
  MotionProps & {
    whileInView: TargetAndTransition;
    viewport: any;
  } => {
  const rng = seedrandom(id);
  return {
    initial: { opacity: 0, y: isIOS ? 60 : 100 },

    whileInView: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2 + rng() * 0.2,
        delay: rng() * 0.1,
      },
    },
    viewport: { once: true },
  };
};
export const productHoverEffect = (): AnimationProps & MotionProps => {
  return {
    whileHover: {
      boxShadow: isMobile ? "none" : "3px 3px 0px 0px #000",
      transition: { duration: 0.3 },
    },
    whileTap: {
      // scale: 0.9,
      transition: { duration: 0.3 },
    },
  };
};
export const productClickEffect = (): AnimationProps & MotionProps => {
  return {
    // whileTap: {
    //   scale: 0.9,
    //   transition: { duration: 0.3 },
    // },
  };
};

export const galleryAnimation = (i: number): AnimationProps => {
  const rng = seedrandom("seed" + i);
  return isIOS
    ? {}
    : {
        initial: {
          opacity: 0,
          x: rng() * 100,
          y: rng() * 50,
        },
        animate: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { delay: i * 0.1, ease: easeOut },
        },
      };
};

export const galleryThumbnailAnimation: AnimationProps & MotionProps = isIOS
  ? {}
  : {
      whileHover: {
        scale: 1.05,
      },
    };

export const chevronAnimation: AnimationProps & MotionProps = isIOS ? {} : {};
