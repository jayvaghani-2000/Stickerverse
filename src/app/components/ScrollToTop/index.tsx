"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "../Icon";

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
            "sticky mb-[10px] block ml-auto bottom-[8px] sm:bottom-[16px] right-[16px] sm:right-[16px] z-10"
          }
          onClick={() => {
            handleScrollToTop();
          }}
        >
          <Icon name="top-arrow" className="h-[28px] sm:h-[36px] md:h-[50px]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
