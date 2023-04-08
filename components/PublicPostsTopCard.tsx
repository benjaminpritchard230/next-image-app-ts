import { RootState } from "@/store/store";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {
  subscriptionsOnly: boolean;
  setSubscriptionsOnly: React.Dispatch<React.SetStateAction<boolean>>;
};

const PublicPostsTopCard = ({
  subscriptionsOnly,
  setSubscriptionsOnly,
}: Props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const token = auth.token;

  const handleChange = () => {
    setSubscriptionsOnly(!subscriptionsOnly);
    router.push("/");
  };

  useEffect(() => {
    console.log(subscriptionsOnly ? "true" : "false", "subs");
  }, [subscriptionsOnly]);

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
          justifyContent: "end",
          height: "62px",
        }}
      >
        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          sx={{ alignItems: "center", justifyContent: "end" }}
        >
          {token.length > 0 ? (
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={subscriptionsOnly}
                    onChange={() => handleChange()}
                  />
                }
                label={
                  subscriptionsOnly
                    ? "Showing posts from subscriptions only"
                    : "Showing posts from everyone"
                }
                labelPlacement="start"
              />
            </FormGroup>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PublicPostsTopCard;
