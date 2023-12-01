import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { getPlatform } from "@/app/utils/getPlatform";

export function MotionImage(props: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isIOS } = getPlatform();

  return (
    <div className={`relative h-full w-full ${props.className ?? ""}`}>
      {!isIOS && (
        <motion.img
          alt=""
          src={props.blurDataURL}
          animate={{
            opacity: isLoaded ? 0 : 1,
            transition: { duration: 0.25 },
          }}
          style={{ position: "absolute", objectFit: "cover" }}
          className="left-0 top-0 z-10 h-full w-full"
        />
      )}
      <Image
        {...props}
        alt={props.alt ?? ""}
        placeholder={isIOS ? "blur" : "empty"}
        onLoadingComplete={() => setIsLoaded(true)}
      />
    </div>
  );
}
