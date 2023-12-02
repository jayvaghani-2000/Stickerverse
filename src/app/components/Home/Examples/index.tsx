import React from "react";
import { MotionImage } from "../../MotionImage";
import { Typography } from "@mui/material";

const ExampleImages = [
  {
    path: "/assets/jpeg/bottle.jpeg",
    alt: "bottle",
    title: "Bottle buddies",
    description:
      "Upgrade your water bottles with our unique and hilarious bottle stickers.",
  },
  {
    path: "/assets/jpeg/laptop.jpeg",
    alt: "laptop",
    title: "laptop frenzy",
    description:
      "Give your laptop a touch of humour with our wide selection of funny laptop stickers.",
  },
  {
    path: "/assets/jpeg/cartoon.jpeg",
    alt: "cartoon",
    title: "cartoon craze",
    description:
      "Explore our funny stickers, perfect for adding some laughter to your everyday items.",
  },
];

const Example = () => {
  return (
    <section className="m-auto flex md:w-[850px] lg:w-[1100px] xl:w-[1200px] justify-around py-[30px] sm:py-[60px] lg:py-[160px]">
      {ExampleImages.map(i => (
        <div
          key={i.alt}
          className="w-[30vw] sm:w-[260px] lg:w-[330px] max-w-[30vw] flex flex-col gap-[10px] text-center items-center justify-start"
        >
          <div className="w-full h-[100px] sm:h-[240px] lg:h-[330px] border-2 border-black">
            <MotionImage
              src={i.path}
              alt=""
              fill
              staticImg
              style={{ objectFit: "cover" }}
              sizes={"330px"}
            />
          </div>
          <Typography variant="h2">{i.title.toUpperCase()}</Typography>
          <Typography
            variant="caption"
            style={{ fontFeatureSettings: "'clig' off, 'liga' off" }}
          >
            {i.description}
          </Typography>
        </div>
      ))}
    </section>
  );
};

export default Example;