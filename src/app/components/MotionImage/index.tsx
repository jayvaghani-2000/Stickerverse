import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { getPlatform } from "@/app/utils/getPlatform";

export function MotionImage(props: ImageProps & { staticImg?: boolean }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isIOS } = getPlatform();

  const { staticImg, ...rest } = props;

  return (
    <div className={`relative h-full w-full ${rest.className ?? ""}`}>
      {!isIOS && !staticImg && (
        <motion.img
          alt=""
          src={rest.blurDataURL}
          animate={{
            opacity: isLoaded ? 0 : 1,
            transition: { duration: 0.25 },
          }}
          style={{ position: "absolute", objectFit: "cover" }}
          className="left-0 top-0 z-10 h-full w-full"
        />
      )}
      <Image
        {...rest}
        alt={rest.alt ?? ""}
        placeholder={isIOS && !staticImg ? "blur" : "empty"}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
