import { useMobileScreen, useTabScreen } from "@/app/utils/useScreenSize";
import { Typography } from "@mui/material";
import classNames from "classnames";
import Image from "next/image";

type FooterSection =
  | {
      title: string;
      image?: never;
    }
  | {
      image: string;
      title?: never;
    };

type FooterType = {
  support: FooterSection[];
  brand: FooterSection[];
  shop: FooterSection[];
  "follow us": FooterSection[];
};

const footer: FooterType = {
  support: [
    {
      title: "Help & FAQ",
    },
    {
      title: "Account",
    },
    {
      title: "Privacy Policy",
    },
    {
      title: "Refund Policy",
    },
  ],
  brand: [
    {
      title: "About us",
    },
    {
      title: "Contact us",
    },
    {
      title: "Blog",
    },
  ],
  shop: [
    {
      title: "New Stickers",
    },
    {
      title: "New T-Shirts",
    },
  ],
  "follow us": [
    {
      image: "/assets/png/facebook.png",
    },
    {
      image: "/assets/png/instagram.png",
    },
  ],
};

const Footer = () => {
  const mobile = useMobileScreen();
  const tab = useTabScreen();

  const getImageSize = () => {
    if (tab) {
      return 28;
    }
    if (mobile) {
      return 24;
    }
    return 50;
  };

  return (
    <footer className="flex flex-col sm:flex-row sm:h-[240px] md:h-[400px] sm:border-t-2 sm:border-black">
      {mobile ? (
        <div className="bg-primeGreen py-[35px] text-center">
          <Typography variant="h2" className="uppercase">
            Sticker Verse
          </Typography>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center sm:w-[280px] md:w-[340px] lg:w-[500px] bg-primeGreen border-r-2 border-black">
          <div className="w-[120px] md:w-[200px] h-[60px] md:h-[100px]">
            <Typography variant="h2" className="uppercase">
              Sticker
            </Typography>
            <Typography variant="h2" className="uppercase text-right">
              Verse
            </Typography>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col justify-between">
        <div className="px-[20px] lg:px-[100px] mt-[20px] sm:mt-[40px] lg:mt-[80px]  grid grid-cols-4 gap-[10px]">
          {Object.keys(footer).map(i => {
            const key = i as keyof typeof footer;

            return (
              <div key={key}>
                <Typography
                  variant="caption"
                  className="whitespace-nowrap	uppercase font-bold"
                >
                  {i}
                </Typography>
                <div
                  className={classNames("my-[10px]", {
                    ["flex gap-[10px] md:gap-[20px]"]: key === "follow us",
                    ["flex flex-col gap-[10px]"]: key !== "follow us",
                  })}
                >
                  {footer[key].map(j => {
                    if (key === "follow us") {
                      return (
                        <Image
                          key={j.image}
                          src={j.image!}
                          alt="social icons"
                          height={getImageSize()}
                          width={getImageSize()}
                        />
                      );
                    }
                    return (
                      <Typography
                        variant="body1"
                        className="whitespace-nowrap"
                        key={j.title}
                      >
                        {j.title}
                      </Typography>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <Typography
          variant="subtitle2"
          className="whitespace-nowrap px-[20px] lg:px-[100px]  grid grid-cols-4 gap-[10px] border-t-2"
        >
          @ 2023 Copyright
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
