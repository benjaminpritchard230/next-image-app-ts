import AboutImageList from "@/components/AboutImageList";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";

type Props = {};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: "left",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

const AboutPage = (props: Props) => {
  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={8}>
        <Item>
          <Typography>
            <h3>About</h3>
            <p>
              This website is a social media platform that allows users to
              create an account and share their own images. Users can also view
              other users&apos; images, like and comment on them, and receive
              notifications when someone likes or comments on their posts.
              Additionally, users can create a profile with an avatar and an
              &quot;about me&quot; section, view other users&apos; profiles, and
              follow other users.
            </p>
            <p>
              To build the website, the developer used a combination of Next.js,
              MUI, Typescript, and RTK Query. Next.js is a popular React
              framework that simplifies the creation of different routes on the
              website, such as for the posts page, login page, or user profile
              page.
            </p>
            <p>
              MUI, or Material UI, is a React UI library that provides many
              useful components for building complex websites with a lot of user
              interaction. The use of MUI made it easier for the developer to
              create a responsive website that can be used on different screen
              sizes.
            </p>
            <p>
              RTK Query is a powerful data fetching and mutation management
              library that was used to handle data fetching and mutations on the
              website. It simplifies the organisation of different API endpoints
              and ensures that data is re-cached when a mutation is made. For
              example, when a user creates a new post, the post data is updated
              so that the new post is displayed immediately. This helps the
              website to feel more responsive.
            </p>
            <p>
              Typescript was used to ensure type safety in handling data
              returned from the backend, which was written in Python using the
              Django framework. The backend was hosted on PythonAnywhere, a
              platform that makes it easy to deploy, run, and scale Python
              applications in the cloud.
            </p>
            <p>
              The combination of Nextjs, MUI, Typescript, and RTK Query allowed
              the developer to build a user-friendly social media platform that
              provides a seamless user experience. The use of modern
              technologies ensures that the website is responsive, performs
              well, and is easy to maintain and update.
            </p>
            <h3>
              <a href="https://github.com/benjaminpritchard230/next-image-app-ts">
                <GitHubIcon />
                &nbsp;Link to website Github repository.
              </a>
            </h3>
            <h3>
              <a href="https://github.com/benjaminpritchard230/django-image-app-api">
                <GitHubIcon />
                &nbsp;Link to Django back-end Github repository.
              </a>
            </h3>
            <h3>
              <a href="https://github.com/benjaminpritchard230">
                <GitHubIcon />
                &nbsp;Created by Ben Pritchard 2023
              </a>
            </h3>
          </Typography>
        </Item>
      </Grid>
      <Grid xs={12} md={4}>
        <Item>
          <AboutImageList />
        </Item>
      </Grid>
    </Grid>
  );
};

export default AboutPage;
