import CoreuiLogo from "@/public/tech-images/coreui.png";
import mdbLogo from "@/public/tech-images/moviedb.svg";
import muiLogo from "@/public/tech-images/mui.png";
import nextLogo from "@/public/tech-images/next.png";
import rtkLogo from "@/public/tech-images/rtk.png";
import sassLogo from "@/public/tech-images/sass.png";
import tsLogo from "@/public/tech-images/typescript.svg";
import styles from "@/styles/AboutImageList.module.scss";
import { Box, Grid } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Image from "next/image";
import * as React from "react";
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

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];
