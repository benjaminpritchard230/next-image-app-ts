import { RootState } from "@/store/store";
import { Box, Pagination } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

type Props = {
  subscriptionsOnly: boolean;
  count: number;
  pageNumber: number;
};

const PaginationCard = ({ subscriptionsOnly, pageNumber, count }: Props) => {
  const router = useRouter();

  const auth = useSelector((state: RootState) => state.auth);
  const token = auth.token;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    router.push(`/?pageNumber=${page}`);
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "50px",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "62px",
        }}
      >
        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Pagination
            // sx={{
            //   margin: "auto",
            //   top: "auto",
            //   right: "46%",
            //   bottom: 35,
            //   position: "fixed",
            // }}
            count={count}
            page={pageNumber}
            color="primary"
            onChange={handlePageChange}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PaginationCard;
