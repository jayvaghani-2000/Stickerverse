import { Skeleton as MuiSkeleton } from "@mui/material";

export const Skeleton = ({ color }: { color: number }) => {
  const colors = [
    "rgb(255, 242, 223)",
    "rgb(255, 237, 243)",
    "rgb(244, 255, 249)",
    "rgb(229, 241, 255)",
  ];
  return (
    <MuiSkeleton
      variant="rectangular"
      sx={{ bgcolor: colors[color] }}
      className="w-full h-full inline-block"
    />
  );
};
