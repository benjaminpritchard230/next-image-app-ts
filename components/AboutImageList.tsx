import muiLogo from "@/public/tech-images/mui.png";
import nextLogo from "@/public/tech-images/next.png";
import rtkLogo from "@/public/tech-images/rtk.png";
import tsLogo from "@/public/tech-images/typescript.svg";
import { Box, Grid } from "@mui/material";
import TechImageCard from "./TechImageCard";
export default function AboutImageList() {
  const techImages = [
    {
      id: 1,
      title: "Nextjs",
      image: nextLogo.src,
    },
    {
      id: 2,
      title: "Typescript",
      image: tsLogo.src,
    },
    {
      id: 3,
      title: "MUI",
      image: muiLogo.src,
    },
    {
      id: 4,
      title: "RTK",
      image: rtkLogo.src,
    },
  ];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        {techImages.map(({ title, image, id }) => {
          return <TechImageCard key={id} title={title!} image={image!} />;
        })}
      </Grid>
    </Box>
  );
}
