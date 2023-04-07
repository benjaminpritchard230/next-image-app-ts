import { Box, CardActionArea, Grid, Paper, styled } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";

type Props = { image: string; title: string };

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  justifyContent: "center",
  display: "flex",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

const TechImageCard = ({ image, title }: Props) => {
  return (
    <Grid
      xs={12}
      lg={6}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Item sx={{ m: 0.5 }}>
        <Card sx={{ width: "73.5%", height: "auto", boxShadow: "none" }}>
          <CardMedia component="img" image={image} alt={title} />
        </Card>
      </Item>
    </Grid>
  );
};

export default TechImageCard;
