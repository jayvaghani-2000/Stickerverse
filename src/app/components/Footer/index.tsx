import { useMobileScreen, useTabScreen } from "@/app/utils/useScreenSize";
import { Typography } from "@mui/material";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

type FooterSection =
  | {
      title: string;
      path: string;
      image?: never;
    }
  | {
      image: string;
      path: string;
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
      path: "/help",
    },
    {
      title: "Account",
      path: "/profile",
    },
    {
      title: "Privacy Policy",
      path: "/policy/privacy",
    },
    {
      title: "Refund Policy",
      path: "/policy/refund",
    },
  ],
  brand: [
    {
      title: "About us",
      path: "/about-us",
    },
    {
      title: "Contact us",
      path: "/contact-us",
    },
    {
      title: "Blog",
      path: "/blog",
    },
  ],
  shop: [
    {
      title: "New Stickers",
      path: "/stickers",
    },
  ],
  "follow us": [
    {
      image: "/assets/png/facebook.png",
      path: "https://www.facebook.com",
    },
    {
      image: "/assets/png/instagram.png",
      path: "https://www.instagram.com",
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
                        <Link key={j.image} href={j.path} target="_blank">
                          <Image
                            key={j.image}
                            src={j.image!}
                            alt="social icons"
                            height={getImageSize()}
                            width={getImageSize()}
                          />
                        </Link>
                      );
                    }
                    return (
                      <Link key={j.title} href={j.path}>
                        <Typography
                          variant="body1"
                          className="whitespace-nowrap"
                        >
                          {j.title}
                        </Typography>
                      </Link>
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
