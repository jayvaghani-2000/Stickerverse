import { headerBanner } from "@/app/utils/constant";
import { Typography } from "@mui/material";

const HeaderBanner = () => {
  return (
    <div className="mt-2 sm:mt-3 md:mt-4">
      <div className={`border-2 border-black `}>
        <img
          src={headerBanner.url}
          alt=""
          className="h-full block object-cover w-full max-h-[200px]"
          placeholder="blur"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div
        className={`mt-4 sm:mt-6 md:mt-8 border-2 bg-primeGreen border-black py-2 md:py-3 `}
      >
        <Typography variant="subtitle2" className="text-center">
          BUY ANY 4 AND GET 25%OFF. BUY ANY 10 AND 50% OFF.
        </Typography>
      </div>
    </div>
  );
};

export default HeaderBanner;
