import AboutImageList from "@/components/AboutImageList";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import * as React from "react";
type Props = {};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AboutPage = (props: Props) => {
  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={6}>
        <Item>
          <Typography>
            <h3>About</h3>
            <p>
              This website, created using Nextjs, MUI, Typescript, and RTK
              query, is a dynamic and interactive platform for users to share
              and view images, connect with other users, and engage in social
              activities. The website allows users to sign up and create a
              profile with an avatar and an about me section. They can also view
              other users&apos; profiles and follow other users.Users can share
              their images, view other users&apos; images, like and comment on
              images, and like other people&apos;s comments. Users can view all
              images that have been posted or only view images from people they
              are following. The website is highly interactive, and users can
              engage with each other through likes and comments.
            </p>
            <p>
              The website is designed to be highly responsive and provides a
              smooth and seamless user experience. With MUI, many useful
              components are available to create a complex website with a lot of
              user interaction. The website is built with Nextjs, which
              simplifies the creation of different routes and pages, such as
              login, user profile, and posts page. The use of typescript ensures
              that there are no type errors and that the data returned from the
              api is handled properly.
            </p>
            <p>
              The core functionality of the website is based on RTK query, which
              simplifies the management of data fetching and mutations. The RTK
              query tag feature allows the data to be re-cached when a mutation
              is made. This means that when, for example, a user creates a new
              post, the post data is updated so that the new post is displayed
              immediately. This ensures that the website is highly responsive
              and provides a seamless user experience. The website uses a
              backend that is written in Python using the Django framework, and
              it is hosted on the Python Anywhere site.
            </p>
            <p>
              In summary, the website created using Nextjs, MUI, typescript, and
              RTK query is a highly interactive and dynamic platform for users
              to connect with each other and engage in social activities. With
              its highly responsive design, users can seamlessly share and view
              images, engage with each other through likes and comments, and
              create profiles with avatars and about me sections.
            </p>
          </Typography>
        </Item>
      </Grid>
      <Grid xs={12} md={6}>
        <Item>
          <AboutImageList />
        </Item>
      </Grid>
    </Grid>
  );
};

export default AboutPage;
