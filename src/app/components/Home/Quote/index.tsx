import { Typography } from "@mui/material";

const Quote = () => {
  return (
    <section className="p-[32px] sm:p-[64px] md:p-[100px] lg:p-[200px] border-b-2 border-black ">
      <div className="text-center uppercase">
        <Typography variant="h1">
          Stickers are like a temporary tattoo
        </Typography>
        <Typography variant="h1">for your stuff, </Typography>
        <Typography variant="h1">and we can’t get enough</Typography>
      </div>
    </section>
  );
};

export default Quote;
