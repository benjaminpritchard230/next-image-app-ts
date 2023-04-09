import { Grid, Paper, styled } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  justifyContent: "center",
  display: "flex",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

type Props = { image: string; title: string };

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
