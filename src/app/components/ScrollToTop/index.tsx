"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const ScrollToTop = ({
  active,
  handleScrollToTop,
}: {
  active: boolean;
  handleScrollToTop: () => void;
}) => {
  return (
    <AnimatePresence>
      {active && (
        <motion.button
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "200%" }}
          className={
            "sticky mb-[10px] block ml-auto bottom-[8px] sm:bottom-[16px] right-[16px] sm:right-[16px] h-[24px] sm:h-[36px] md:h-[50px] w-[24px] sm:w-[36px] md:w-[50px]  z-10"
          }
          onClick={() => {
            handleScrollToTop();
          }}
        >
          <Image src="/assets/svg/top-arrow.svg" alt="goToTop" fill />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
